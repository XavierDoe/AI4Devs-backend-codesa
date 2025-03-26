# Prompt 1

## **Design a GET endpoint** `/positions/:id/candidates`

### **Requirements:**
- Retrieve all candidates associated with a specific `positionID`.
- Combine data from the tables `[candidate]`, `[application]`, and `[interview]`.
- Include in the response:
  - **Full name**: Concatenate `first_name` + `last_name` of the candidate.
  - **current_interview_step**: Field from `application`.
  - **average_score**: Average of all scores from their interviews.
- Order the results by `average_score` in descending order.

### **Error Handling:**
- **404**: If the position does not exist.
- **400**: If an invalid parameter is provided.

---

# Prompt 2

## **Create a PUT endpoint** `/candidates/:id/stage`

### **Specifications:**
- Update the `current_interview_step` field of a specific candidate.

### **Required Validations:**
- The candidate must exist in the `application` table.

### **Example Input:**
```json
{ "currentInterviewStep": 0 }
