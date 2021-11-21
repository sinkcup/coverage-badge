# test coverage badge
[![CI](https://github.com/sinkcup/coverage-badge/actions/workflows/ci.yml/badge.svg)](https://github.com/sinkcup/coverage-badge/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/sinkcup/coverage-badge/branch/main/graph/badge.svg?token=VQTY6VvfTf)](https://codecov.io/gh/sinkcup/coverage-badge)

create coverage badge by parsing test coverage reports.

## Usage

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

png(default):

![image](https://user-images.githubusercontent.com/4971414/142746070-76763e63-2d0a-469d-a377-e55cea63b2e1.png)

text:

```shell
npx test-coverage-badge --format jacoco-xml \
  --output-format text \
  ./build/reports/jacoco/test/jacocoTestReport.xml
```

```text
80%
```
