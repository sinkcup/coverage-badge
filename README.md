# coverage badge
[![CI](https://github.com/sinkcup/coverage-badge/actions/workflows/ci.yml/badge.svg)](https://github.com/sinkcup/coverage-badge/actions/workflows/ci.yml)

create coverage badge by parsing test coverage reports.

## Usage

### png(default)

```shell
coverage-badge --format jacoco-xml ./build/reports/jacoco/test/jacocoTestReport.xml
```

output:

![image](https://user-images.githubusercontent.com/4971414/142746070-76763e63-2d0a-469d-a377-e55cea63b2e1.png)

### text

```shell
coverage-badge --format jacoco-xml \
  --output-format text \
  ./build/reports/jacoco/test/jacocoTestReport.xml
```

output:

```text
80%
```
