# Cria o bucket S3
aws --endpoint-url=http://localhost:4566 s3api create-bucket --bucket mybucket

# Define o ACL do bucket como público
aws --endpoint-url=http://localhost:4566 s3api put-bucket-acl --bucket mybucket --acl public-read

# Configura o bucket para uma aplicação web estática
aws --endpoint-url=http://localhost:4566 s3 website s3://mybucket --index-document index.html --error-document index.html

# Faz o deploy do build da aplicação para o S3
aws --endpoint-url=http://localhost:4566 s3 cp /root/localstack/s3 s3://mybucket/ --recursive