
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import json
import tempfile
import time

app = Flask(__name__)
CORS(app)  # Erlaubt Cross-Origin Requests

# Beispiel SA-Codes (in einer realen Anwendung würden diese aus einer Datenbank kommen)
SA_CODES = [
    "S01", "S02", "S03", "S04", "S05", 
    "S06", "S07", "S08", "S09", "S10",
    "P31", "P55", "P64", "P82", "P87"
]

@app.route('/api/sa-codes', methods=['GET'])
def get_sa_codes():
    return jsonify({"sa_codes": SA_CODES})

@app.route('/api/sa-codes', methods=['POST'])
def add_sa_code():
    data = request.json
    code = data.get('code')
    
    if code and code not in SA_CODES:
        SA_CODES.append(code)
    
    return jsonify({"sa_codes": SA_CODES})

@app.route('/api/generate-vehicle-list', methods=['POST'])
def generate_vehicle_list():
    # Hier würde die eigentliche Logik zur Verarbeitung der Excel- und JSON-Dateien stehen
    # Für dieses Beispiel simulieren wir nur eine Verzögerung und geben eine "Dummy"-Datei zurück
    
    # Simulierte Verarbeitung
    time.sleep(5)
    
    # In einer echten Anwendung würden Sie hier die Excel-Datei erstellen
    # Für dieses Beispiel senden wir einfach eine leere Excel-Datei
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.xlsx')
    temp_file.close()
    
    return send_file(
        temp_file.name,
        as_attachment=True,
        download_name='Fahrzeugliste.xlsx',
        mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )

if __name__ == '__main__':
    app.run(debug=True, port=5000)
