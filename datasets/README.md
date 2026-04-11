# Datasets

## Amazon Products Dataset 2023 (1.4M products)

**Source:** [Kaggle — Amazon Products Dataset 2023](https://www.kaggle.com/datasets/asaniczka/amazon-products-dataset-2023-1-4m-products)

### Download

1. Ensure you have a Kaggle account and the [Kaggle CLI](https://github.com/Kaggle/kaggle-api) installed.
2. Run:
   ```bash
   kaggle datasets download -d asaniczka/amazon-products-dataset-2023-1-4m-products -p datasets/ --unzip
   ```
   Or download manually from the link above and extract the files into this `datasets/` directory.

### Expected files

| File                    | Description                             |
| ----------------------- | --------------------------------------- |
| `amazon_products.csv`   | ~1.4M products with price, rating, etc. |
| `amazon_categories.csv` | Category hierarchy                      |

> **Note:** CSV files are git-ignored. Do not commit them to the repository.
