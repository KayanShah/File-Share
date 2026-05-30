import yfinance as yf
import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error
import matplotlib.pyplot as plt
import joblib

# 1. Download historical data
ticker_symbol = 'AAPL'
ticker = yf.Ticker(ticker_symbol)
hist = ticker.history(period='1y')

# Check if data was downloaded
if hist.empty:
    raise ValueError(f"No data found for ticker {ticker_symbol}")

# 2. Prepare DataFrame
df = hist.reset_index()
df['Close_Pred'] = df['Close'].shift(-1)
df.dropna(inplace=True)

X = df[['Open', 'High', 'Low', 'Close', 'Volume']]
y = df['Close_Pred']

# Check if features and target are non-empty
if X.empty or y.empty:
    raise ValueError("No training data available")

# 3. Split Data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Train Linear Regression model with GridSearchCV
model = LinearRegression()
param_grid = {'fit_intercept': [True, False]}
grid_search = GridSearchCV(model, param_grid, cv=5)
grid_search.fit(X_train, y_train)

# 5. Predict and evaluate
best_model = grid_search.best_estimator_
predictions = best_model.predict(X_test)

mae = mean_absolute_error(y_test, predictions)
mse = mean_squared_error(y_test, predictions)
print(f"Mean Absolute Error: {mae}")
print(f"Mean Squared Error: {mse}")

# 6. Visualization
plt.figure(figsize=(10, 5))
plt.plot(y_test.values, label='Actual Prices')
plt.plot(predictions, label='Predicted Prices')
plt.legend()
plt.title(f'{ticker_symbol} Actual vs Predicted Prices')
plt.xlabel('Time')
plt.ylabel('Price')
plt.show()

# 7. Save the trained model
joblib.dump(best_model, 'stock_price_model.pkl')
