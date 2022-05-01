run:
	npm run start

build:
	npm run build

frontend:
	npm run build && source .venv/bin/activate && python3 src/hostly.py --debug