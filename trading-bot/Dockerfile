# PC-free deployment: runs the Tradovate feed + the app on any cloud host.
FROM python:3.12-slim
WORKDIR /app
COPY . .
RUN pip install --no-cache-dir -r requirements-cloud.txt
EXPOSE 8787
# Credentials (TRADOVATE_*) and TRADOVATE_CONTRACT are passed in at run time,
# e.g.:  docker run -p 8787:8787 --env-file tradovate.env paperbot
CMD ["bash", "run-cloud.sh"]
