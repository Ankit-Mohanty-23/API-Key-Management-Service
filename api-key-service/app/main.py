from app.core.config import PORT
from fastapi import FastAPI, Depends
from app.db.deps import get_db
from sqlalchemy.orm import Session
from app.db.session import engine, Base
from sqlalchemy import text
import app.models

app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.get("/")
def health_check(db: Session = Depends(get_db)):
    try:
        # run simple query to verify database connection
        db.execute(text("SELECT 1"))

        return {
            "status": "healthy",
            "server": "running on port 8000",
            "database": "connected"
        }

    except Exception:
        return {
            "status": "unhealthy",
            "server": "running",
            "database": "disconnected"
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=PORT, reload=True)
