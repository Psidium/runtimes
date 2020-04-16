
build12:
	docker build -t psidium/nodejs-instrumentation:12$$RUNTIME_TAG_MODIFIER -f Dockerfile.12 .

push12:
	docker push psidium/nodejs-instrumentation:12$$RUNTIME_TAG_MODIFIER

# Mandatory jobs
build-all: build12
push-all: push12