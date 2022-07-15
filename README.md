# Docker Monitoring with Grafana

#### Docker commands

```bash
docker rm -vf $(docker ps -a -q)
docker-compose up
```

#### Lucene Query

https://lucene.apache.org/core/2_9_4/queryparsersyntax.html

#### Grafana HTTP API

- Create Key

  ```bash
  POST http://admin:admin@localhost:3000/api/auth/keys
  {
      "name": "test",
      "role": "Admin"
  }
  ```

- Get Keys

  ```bash
  GET http://localhost:3000/api/auth/keys
  Authorization: BEARER {token}
  ```

- Get Alerts

  ```bash
  GET http://localhost:3000/api/alertmanager/grafana/api/v2/alerts
  Authorization: BEARER {token}
  ```

- Create Alert

  ```bash
  POST http://localhost:3000/api/ruler/grafana/api/v1/rules/cpu-alert-rules
  Authorization: BEARER {token}
  {
      "name": "system",
      "interval": "10s",
      "rules": [
          {
              "expr": "",
              "for": "20s",
              "annotations": {
                  "description": "CPU is too high",
                  "summary": "Alert message for CPU"
              },
              "grafana_alert": {
                  "id": 2,
                  "orgId": 1,
                  "title": "Docker CPU Usage",
                  "condition": "C",
                  "data": [
                      {
                          "refId": "A",
                          "queryType": "",
                          "relativeTimeRange": {
                              "from": 900,
                              "to": 0
                          },
                          "datasourceUid": "PBFA97CFB590B2093",
                          "model": {
                              "datasource": {
                                  "type": "prometheus",
                                  "uid": "PBFA97CFB590B2093"
                              },
                              "expr": "sum by (name) (rate(container_cpu_usage_seconds_total{image=\"\",container_label_org_label_schema_group=\"\"}[1m])) / scalar(count(node_cpu_seconds_total{mode=\"user\"})) * 100",
                              "interval": "",
                              "intervalFactor": 10,
                              "intervalMs": 15000,
                              "legendFormat": "{{ name }}",
                              "maxDataPoints": 43200,
                              "metric": "container_cpu_user_seconds_total",
                              "refId": "A",
                              "step": 10
                          }
                      },
                      {
                          "refId": "B",
                          "queryType": "",
                          "relativeTimeRange": {
                              "from": 0,
                              "to": 0
                          },
                          "datasourceUid": "-100",
                          "model": {
                              "conditions": [
                                  {
                                      "evaluator": {
                                          "params": [
                                              1
                                          ],
                                          "type": "gt"
                                      },
                                      "operator": {
                                          "type": "and"
                                      },
                                      "query": {
                                          "params": [
                                              "A"
                                          ]
                                      },
                                      "reducer": {
                                          "params": [],
                                          "type": "last"
                                      },
                                      "type": "query"
                                  }
                              ],
                              "datasource": {
                                  "type": "__expr__",
                                  "uid": "-100"
                              },
                              "expression": "A",
                              "hide": false,
                              "intervalMs": 1000,
                              "maxDataPoints": 43200,
                              "reducer": "last",
                              "refId": "B",
                              "type": "reduce"
                          }
                      },
                      {
                          "refId": "C",
                          "queryType": "",
                          "relativeTimeRange": {
                              "from": 0,
                              "to": 0
                          },
                          "datasourceUid": "-100",
                          "model": {
                              "conditions": [
                                  {
                                      "evaluator": {
                                          "params": [
                                              0,
                                              0
                                          ],
                                          "type": "gt"
                                      },
                                      "operator": {
                                          "type": "and"
                                      },
                                      "query": {
                                          "params": []
                                      },
                                      "reducer": {
                                          "params": [],
                                          "type": "avg"
                                      },
                                      "type": "query"
                                  }
                              ],
                              "datasource": {
                                  "name": "Expression",
                                  "type": "__expr__",
                                  "uid": "__expr__"
                              },
                              "expression": "$B>1",
                              "hide": false,
                              "intervalMs": 1000,
                              "maxDataPoints": 43200,
                              "refId": "C",
                              "type": "math"
                          }
                      }
                  ],
                  "updated": "2022-07-03T02:08:30Z",
                  "intervalSeconds": 10,
                  "version": 30,
                  "namespace_uid": "_oIkcienz",
                  "namespace_id": 4,
                  "rule_group": "system",
                  "no_data_state": "NoData",
                  "exec_err_state": "Alerting"
              }
          }
      ]
  }
  ```

#### Grafana HTTP API swagger

https://editor.swagger.io/?url=https://raw.githubusercontent.com/grafana/grafana/main/pkg/services/ngalert/api/tooling/post.json

#### Grafana Dashboards

https://grafana.com/grafana/dashboards
