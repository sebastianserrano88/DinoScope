from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return {"message": "Welcome to DinoScope!"}


@app.route("/api/dinosaurs")
def dinosaurs():
    return {
        "dinosaurs": [
            "Tyrannosaurus Rex",
            "Velociraptor",
            "Triceratops",
            "Spinosaurus"
        ]
    }


if __name__ == "__main__":
    app.run(debug=True)