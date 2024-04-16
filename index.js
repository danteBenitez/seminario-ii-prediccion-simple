import { initModel, trainModel } from "./model.js";

const trainButton = document.querySelector("#train-btn");
const trainLoading = document.querySelector("#train-btn i");
const predictionContainer = document.querySelector(".prediction-container");
const predictionInput = document.querySelector(".prediction-container input");
const predictButton = document.querySelector(".prediction-container button");

const output = document.querySelector("#output");

let model = await initModel();

trainButton.addEventListener('click', async () => {
    trainLoading.classList.remove("visually-hidden");
    trainButton.setAttribute('disabled', '');
    setTimeout(async () => {
        await trainModel(model);
        Swal.fire({
            icon: 'success',
            title: 'Entrenamiento terminado',
            text: 'El modelo está listo para ser utilizado.'
        })
        trainLoading.classList.add("visually-hidden");
        predictionContainer.classList.remove('visually-hidden')
    }, 100);
});

predictButton.addEventListener('click', async () => {
    if (!model) return;
    const value = parseFloat(predictionInput.value);
    const input = tf.tensor2d([value], [1, 1]);
    const prediction = await model.predict(input);
    const predictionData = await prediction.data();
    output.textContent = `El resultado de predecir para ${value} es ${predictionData}`;
});


