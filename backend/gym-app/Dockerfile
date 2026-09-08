# ============================================================
# Stage 1: BUILD — Compila el .jar con Maven
# ============================================================
FROM maven:3.9.9-eclipse-temurin-21 AS builder

WORKDIR /app

# Copiamos primero el pom.xml para aprovechar el cache de capas de Docker.
# Si solo cambia el código fuente (no las dependencias), Docker reutiliza
# la capa de descarga de dependencias y el build es mucho más rápido.
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Ahora copiamos el código fuente y compilamos
COPY src ./src
RUN mvn clean package -DskipTests -B


# ============================================================
# Stage 2: RUN — Imagen final liviana solo con el JRE
# ============================================================
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copiamos únicamente el .jar generado en el stage anterior
COPY --from=builder /app/target/*.jar app.jar

# Puerto en el que Spring Boot escucha
EXPOSE 8080

# Punto de entrada de la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
