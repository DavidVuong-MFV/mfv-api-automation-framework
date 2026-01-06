@smokeTest
Feature: Agent API Feature
Scenario: Create success agent by identifier 
  Given I prepare agent payload from "addNewAgent.json"
  When I create an agent 
  Then the response status is 201
  Then the response body contains the agent identifier and uuid
  
# Scenario: Create unsuccess agent by invalid payload
  # Given I prepare agent payload from "addNewAgentConflict.json"
  # When I create an agent
  # Then the response status is 409
  # Then the response body contains error message "Agent already exists with this identifier"

