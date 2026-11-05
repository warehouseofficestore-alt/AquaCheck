async function redirectToStripeCheckout() {
  try {
    // Llamada a una función serverless o endpoint que genera la sesión de Stripe
    const response = await fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId: 'tu_price_id_de_stripe' }) // Reemplaza con tu ID real de Stripe
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url; // Redirige al checkout de Stripe
    } else {
      alert('Error al iniciar el pago');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
