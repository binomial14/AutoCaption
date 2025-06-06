# AutoCaption

## Usage

### Frontend
Needs to enable HTTPS
```
cd frontend
npm install
npm start # HTTPS=true SSL_CRT_FILE=../cert.pem SSL_KEY_FILE=../key.pem npm start
```

### Backend
Environment:
```
python -m venv env
source env/bin/activate
pip install -r backend/requirements.txt
```
put google credential file under /tmp
```
cd backend
python server.py
```