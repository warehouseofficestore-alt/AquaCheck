const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

// Inicializa Supabase con privilegios de servicio (Service Role Key)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  let stripeEvent;

  try {
    // Validación de seguridad del webhook de Stripe
    stripeEvent = stripe.webhooks.constructEvent(event.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  // Si el pago se completó con éxito
  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    const userEmail = session.customer_email || session.customer_details?.email;

    if (userEmail) {
      // Actualiza el estado de la suscripción en la tabla profiles de Supabase
      const { error } = await supabase
        .from('profiles')
        .update({ subscription_status: 'active' })
        .eq('email', userEmail);

      if (error) {
        console.error('Error al actualizar Supabase:', error);
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
      }
    }
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
