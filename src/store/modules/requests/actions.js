export default {
  async contactCoach(context, payload) {
    const newRequest = {
      id: new Date().toISOString(),
      coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message,
    };
    const response = await fetch(
      `https://testcouch-e4747-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: "POST",
        body: JSON.stringify(newRequest),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        response.formData.message || "Failed to send request."
      );
      throw error;
    }
    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;
    context.commit("addRequest", newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const response = await fetch(
      `https://testcouch-e4747-default-rtdb.firebaseio.com/requests/${coachId}.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        response.formData.message || "Failed to fetch request."
      );
      throw error;
    }
    const request = [];
    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };
      request.push(request);
    }
    context.commit();
  },
};
