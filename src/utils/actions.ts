import { store } from "@/store"; // Adjust the path as needed
import { hotelApi, CustomerInfo } from "@/hooks/useData"; // Adjust the path as needed

export const sendCustomerInfoToBackend = async (customerData: CustomerInfo) => {
  try {
    const result = await store
      .dispatch(hotelApi.endpoints.customerAuth.initiate(customerData))
      .unwrap();
    console.log("Customer info sent to backend successfully:", result);
  } catch (error) {
    console.error("Failed to send customer info:", error);
    throw error;
  }
};
