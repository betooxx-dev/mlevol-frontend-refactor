
export const InputOptions: { [key: string]: string[] } = {
    "join_type": 
    [
        "inner",
        "outer",
        "inner left",
        "inner right",
        "outer left",
        "outer right",
    ],
    "color":
    [
        "rgba(255, 99, 132, 0.75)",
        "rgba(54, 162, 235, 0.75)",
        "rgba(255, 206, 86, 0.75)",
        "rgba(75, 192, 192, 0.75)",
        "rgba(153, 102, 255, 0.75)",
        "rgba(255, 159, 64, 0.75)",
    ],
    "dataset_source":
    [
        "local disk",
        "url",
    ],
    "model_source":
    [
        "local disk",
        "url",
    ],
    "decompose_type":
    [
        "PCA",
        "ICA",
        "LDA",
        "t-SNE",
    ],
    "scale_type":
    [
        "Standard",
        "MinMax",
        "MaxAbs",
        "Robust",
    ],
}