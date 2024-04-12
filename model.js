const INPUT_LENGTH = 9;

const DEFAULT_INPUT = Array.from({ length: INPUT_LENGTH }).map((_, i) => i - 6);
const DEFAULT_OUTPUT = DEFAULT_INPUT.map((x) => 2 * x + 6);

export async function initModel() {
    const model = tf.sequential({
        layers: [
                tf.layers.dense({
                units: 1,
                inputShape: [1],
        }),
    ],
    });

    await model.compile({
        loss: "meanSquaredError",
        optimizer: "sgd",
    });

    return model;
}

const defaultTensorInput = tf.tensor2d(DEFAULT_INPUT, [DEFAULT_INPUT.length, 1]);
const defaultTensorOutput = tf.tensor2d(DEFAULT_OUTPUT, [DEFAULT_INPUT.length, 1]);

export async function trainModel(
  model,
  tensorInput = defaultTensorInput,
  tensorOutput = defaultTensorOutput
) {
  await model.fit(tensorInput, tensorOutput, {
    epochs: 350,
  });

  return model;
}
