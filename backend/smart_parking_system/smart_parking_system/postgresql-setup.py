import os
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

# === CONFIGURATION ===
DB_NAME = os.getenv("DB_NAME", "smart_parking_app_db")
DB_USER = os.getenv("DB_USER", "spa")          # The user you want to create
DB_PASSWORD = os.getenv("DB_PASSWORD", "password")
DB_HOST = os.getenv("DB_HOST", "127.0.0.1")
DB_PORT = os.getenv("DB_PORT", "5434")

# PostgreSQL superuser credentials (for creating user & db)
PG_SUPERUSER = os.getenv("PG_SUPERUSER", "postgres")
PG_SUPERUSER_PASSWORD = os.getenv("PG_SUPERUSER_PASSWORD", "password")


def create_pg_user_and_db():
    try:
        print(f"Connecting to PostgreSQL as superuser '{PG_SUPERUSER}'...")
        conn = psycopg2.connect(
            dbname="postgres",
            user=PG_SUPERUSER,
            password=PG_SUPERUSER_PASSWORD,
            host=DB_HOST,
            port=DB_PORT,
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = conn.cursor()

        # Check if user exists
        cur.execute(f"SELECT 1 FROM pg_roles WHERE rolname = '{DB_USER}';")
        user_exists = cur.fetchone()

        if not user_exists:
            cur.execute(f"CREATE USER {DB_USER} WITH PASSWORD '{DB_PASSWORD}';")
            print(f"✅ PostgreSQL user '{DB_USER}' created.")
        else:
            print(f"ℹ️ PostgreSQL user '{DB_USER}' already exists.")

        # Check if database exists
        cur.execute(f"SELECT 1 FROM pg_database WHERE datname = '{DB_NAME}';")
        db_exists = cur.fetchone()

        if not db_exists:
            cur.execute(f"CREATE DATABASE {DB_NAME} OWNER {DB_USER};")
            print(f"✅ Database '{DB_NAME}' created with owner '{DB_USER}'.")
        else:
            print(f"ℹ️ Database '{DB_NAME}' already exists.")

        # Grant all privileges to the user on the DB (optional, since owner has privileges)
        cur.execute(f"GRANT ALL PRIVILEGES ON DATABASE {DB_NAME} TO {DB_USER};")

        cur.close()
        conn.close()

    except Exception as e:
        print("❌ Error creating user or database:", e)


if __name__ == "__main__":
    create_pg_user_and_db()
