from fastapi import FastAPI

app = FastAPI(title="AI Side-Hustle Roadmap API")


@app.get("/health")
async def health_check():
    return {"status": "ok"}


@app.post("/api/roadmap")
async def generate_roadmap(payload: dict):
    """Placeholder endpoint for roadmap generation."""
    return {
        "message": "Roadmap generation is not implemented yet.",
        "input": payload,
    }
