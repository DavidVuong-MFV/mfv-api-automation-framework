@smokeTest
Feature: Agent API Feature
Scenario: Create agent by identifier 
  Given I prepare agent payload from "addNewAgent.json"
  When I create an agent 
  Then the response status is 201
  Then the response body contains the agent identifier and uuid
  
# use tag @regression to run only regression tests
