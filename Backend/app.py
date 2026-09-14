from flask import Flask, request
from flask_cors import CORS
from dinosaurs import dinosaurs

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return {"message": "Welcome to DinoScope!"}


@app.route("/api/dinosaurs")
def get_dinosaurs():
    return {
        "dinosaurs": list(dinosaurs.values())
    }


@app.route("/api/search")
def search_dinosaur():
    query = request.args.get("query", "").lower().strip()

    if query in dinosaurs:
        return dinosaurs[query]

    return {
        "error": "Dinosaur not found"
    }, 404


if __name__ == "__main__":
    app.run(debug=True)