from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user_schema import UserSignup
from app.core.security import hash_password


def create_user(db: Session, user_data: UserSignup):

    # check if user already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()

    if existing_user:
        raise Exception("User already exists")

    # hash password
    hashed_password = hash_password(user_data.password)

    # create user object
    new_user = User(
        email=user_data.email,
        password=hashed_password
    )

    # save to database
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user
