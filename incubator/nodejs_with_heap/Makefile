
build12:
	docker build -t psidium/nodejs-with-heap:12$$RUNTIME_TAG_MODIFIER -f Dockerfile.12 .

push12:
	docker push psidium/nodejs-with-heap:12$$RUNTIME_TAG_MODIFIER

# Mandatory jobs
build-all: build12
push-all: push12