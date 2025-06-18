# House Price Prediction (Linear Regression)

This project is a complete machine learning pipeline for predicting house prices using linear regression. It includes data preprocessing, model training, evaluation, and a web-based user interface for making predictions.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Overview

This application predicts the median value of owner-occupied homes based on features such as the average number of rooms, percentage of lower status population, and pupil-teacher ratio. The backend is powered by Flask and scikit-learn, while the frontend is a modern React-based UI.

---

## Features

- Data preprocessing and model training in Jupyter Notebook
- Linear regression model with feature scaling
- REST API for predictions (Flask)
- Interactive web UI for user input and predictions (React + Tailwind CSS)
- Cross-origin support for frontend-backend communication

---

## Project Structure

```
house_prediction_Linear/
│
├── data/                   # Folder for datasets
│   ├── raw/                # Original, immutable data dump
│   ├── processed/          # Cleaned and processed data
│   └── notebooks/          # Jupyter notebooks for data exploration and preprocessing
│
├── models/                 # Trained model artifacts
│   ├── linear_regression.pkl # Linear regression model
│   └── ...                 # Other model files
│
├── app/                    # Flask web application
│   ├── static/             # Static files (CSS, JavaScript, images)
│   ├── templates/          # HTML templates
│   ├── api.py              # Flask API routes
│   └── app.py              # Main application file
│
├── venv/                   # Virtual environment
│
├── .gitignore              # Git ignore file
├── README.md               # Project documentation
└── requirements.txt         # Python package dependencies
```

---

## Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/house_prediction_Linear.git
   cd house_prediction_Linear
   ```

2. **Create a virtual environment:**
   ```sh
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   - **Windows:**
     ```sh
     venv\Scripts\activate
     ```
   - **macOS/Linux:**
     ```sh
     source venv/bin/activate
     ```

4. **Install the required packages:**
   ```sh
   pip install -r requirements.txt
   ```

5. **Run the application:**
   ```sh
   python app/app.py
   ```

---

## Usage

- Access the web application at `http://127.0.0.1:5000`
- Use the provided REST API for predictions or interact with the web UI

---

## API Reference

### Predict House Price

- **URL:** `/api/predict`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "feature1": value1,
    "feature2": value2,
    ...
  }
  ```
- **Response:**
  ```json
  {
    "predicted_price": value
  }
  ```

---

## Troubleshooting

### Permission Denied Error

If you see a "Permission denied" error when running Python, Flask, or saving files, try the following:

- **Close any programs using the file or folder.**
- **Open your terminal as Administrator** (right-click Command Prompt or PowerShell and select "Run as administrator").
- **Check that your virtual environment is activated.**
- **Ensure you have write permissions to the folder:**  
  - Right-click the folder (`house_prediction_Linear`), go to Properties → Security, and make sure your user has "Full control".
- **If using Windows Defender or antivirus,** temporarily disable it or add an exception for your project folder.

If you are running a script and get "Permission denied" on a file:
- Make sure the file is not open in another program (like Excel or Notepad).
- Try deleting any `.pkl` or output files manually if they are locked.

**Example: Run as Administrator**
```sh
# Close all terminals, then open a new one as Administrator:
# (Windows) Search for "cmd", right-click, "Run as administrator"
cd C:\Users\admin\Desktop\ml-project\house_prediction_Linear
venv\Scripts\activate
python app.py
```

---

## GitHub Permission Denied (403) Error

You are seeing:
```
Permission to IndhuVelu-dev/House-Price-Prediction.git denied to preethika233.
fatal: unable to access 'https://github.com/IndhuVelu-dev/House-Price-Prediction.git/': The requested URL returned error: 403
```

### Why this happens:
- Your GitHub user (`preethika233`) does **not** have push access to the repository `IndhuVelu-dev/House-Price-Prediction.git`.
- You may be trying to push to a repository you do not own or have not been granted permission to.

### How to resolve:
1. **Fork the repository** to your own GitHub account and push to your fork.
2. **Ask the repository owner** (`IndhuVelu-dev`) to add you as a collaborator if you need push access.
3. **Check your remote URL** with:
   ```sh
   git remote -v
   ```
   If it points to the original repo, change it to your fork:
   ```sh
   git remote set-url origin https://github.com/<your-username>/House-Price-Prediction.git
   ```
4. **Authenticate with correct credentials** if prompted.

### Example: Push to your own fork
```sh
# Fork the repo on GitHub, then:
git remote set-url origin https://github.com/<your-username>/House-Price-Prediction.git
git push origin main
```

**Summary:**  
You need write access to push to a repository. Use your own fork or request access from the owner.

---

## Git Line Ending Warnings

You are seeing warnings like:
```
warning: in the working copy of 'venv/Lib/site-packages/pandas/_libs/tslibs/conversion.pyi', LF will be replaced by CRLF the next time Git touches it
```

**What does this mean?**
- Git is warning that line endings in some files are LF (Unix style), but your system is set to use CRLF (Windows style).
- This is not an error and does not affect your code execution.

**How to handle:**
- You can safely ignore these warnings for files inside `venv/` (your virtual environment).
- To avoid tracking changes in `venv/`, add it to your `.gitignore` file.

**Add to your `.gitignore`:**
```
venv/
```

**If you want to suppress these warnings globally:**
```sh
git config --global core.autocrlf true
```

**Summary:**  
These warnings are safe to ignore, especially for files in your virtual environment.  
Never commit your `venv/` folder to version control.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
