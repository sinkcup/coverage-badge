# test coverage badge
[![CI](https://github.com/sinkcup/coverage-badge/actions/workflows/ci.yml/badge.svg)](https://github.com/sinkcup/coverage-badge/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/sinkcup/coverage-badge/branch/main/graph/badge.svg?token=VQTY6VvfTf)](https://codecov.io/gh/sinkcup/coverage-badge)

create coverage badge by parsing test coverage reports.

## Usage

### help

```shell
npx test-coverage-badge --help
```

![image](https://user-images.githubusercontent.com/4971414/143799539-7f8fc90d-edc2-4bb3-9735-75e101a0743e.png)

### format

```shell
npx test-coverage-badge --format clover \
  ./coverage/clover.xml
```

```shell
npx test-coverage-badge --format jacoco-xml \
  ./build/reports/jacoco/test/jacocoTestReport.xml
```

### output format

png(default): ![image](https://user-images.githubusercontent.com/4971414/142746070-76763e63-2d0a-469d-a377-e55cea63b2e1.png)

svg:

```shell
npx test-coverage-badge --format clover \
  --output-format svg \
  ./coverage/clover.xml
```

text:

```shell
npx test-coverage-badge --format jacoco-xml \
  --output-format text \
  ./build/reports/jacoco/test/jacocoTestReport.xml
```

```text
80%
```

### output file

default: `./coverage.png` or `./coverage.svg`

custom:

```shell
npx test-coverage-badge --format clover \
  --output ./coverage/coverage.png \
  ./coverage/clover.xml
```
