from flask import Flask, request, jsonify
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

# Dummy data representing economic impact estimates
estimates = {
    "var1": 3.1,
    "var2": 4.2,
}

@app.route('/update_estimate', methods=['GET'])
def update_estimate():

    # Simulate fetching updated estimate from database or external API
    # For demonstration purposes, we'll just increment the current estimate
    for key in estimates:
        estimates[key] += 1
    time.sleep(1)  # Simulate processing time
    return jsonify(estimates)
   

if __name__ == '__main__':
    app.run(debug=True)
