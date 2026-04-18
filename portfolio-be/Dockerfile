#Build the app
FROM rust:1.92-slim-bookworm AS builder
WORKDIR ./

RUN cargo install cargo-chef --version ^0.1
#Only copy the Cargo files and build dependencies first
COPY Cargo.toml Cargo.lock ./

#Build dependencies only (no src copy yet)
RUN mkdir src && echo "fn main() {}" > src/main.rs && touch src/libs.rs && cargo build --release && rm -R src
#Copy the source code and build the app
COPY src ./src
#touch the file to make sure the build will run without taking from cache (Rust only)
RUN touch src/main.rs && touch src/libs.rs && cargo build --release

# Runtime environment
FROM debian:bookworm-slim AS runtime
WORKDIR ./

#rusttls needs ca-certificates
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

#New user for security
RUN useradd -ms /bin/bash appuser
USER appuser

COPY --from=builder /target/release/portfolio-be /app/portfolio-be
EXPOSE 8000
CMD ["./portfolio-be"]
