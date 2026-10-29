import streamlit as st
import joblib
import pandas as pd

# Configuración de la página web
st.set_page_config(
    page_title="AquaCheck - Análisis de Agua",
        page_icon="💧",
            layout="centered"
            )

            st.title("💧 AquaCheck: Sistema Inteligente")
            st.write("Bienvenido a la plataforma de predicción y control de calidad. Ingrese los parámetros requeridos para realizar el análisis.")

            # Cargar el modelo entrenado de forma eficiente
            @st.cache_resource
            def load_model():
                return joblib.load("AquaCheckModel.pkl")

                try:
                    model = load_model()
                        st.success("¡Modelo cargado correctamente en la nube!")
                        except Exception as e:
                            st.error(f"No se pudo cargar el modelo: {e}")

                            st.markdown("---")
                            st.subheader("Parámetros de Entrada")

                            # Campos de entrada
                            feature_1 = st.number_input("Parámetro 1 (Ej. pH / Nivel de turbidez)", value=0.0)
                            feature_2 = st.number_input("Parámetro 2 (Ej. Temperatura / Conductividad)", value=0.0)
                            feature_3 = st.number_input("Parámetro 3 (Ej. Minerales disueltos)", value=0.0)

                            # Botón para ejecutar la predicción
                            if st.button("Ejecutar Análisis AquaCheck"):
                                input_data = pd.DataFrame([[feature_1, feature_2, feature_3]])
                                    
                                        try:
                                                prediction = model.predict(input_data)
                                                        st.markdown("### Resultado del Diagnóstico:")
                                                                st.info(f"El resultado de la evaluación es: **{prediction[0]}**")
                                                                    except Exception as e:
                                                                            st.warning("Nota: Asegúrate de que el número de campos de entrada coincida exactamente con las variables que usó tu modelo al ser entrenado.")

                                                                            