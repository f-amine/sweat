export interface TaagerOrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface TaagerOrderData {
  productId?: string;
  receiverName: string;
  phoneNumber: string;
  province: string;
  streetName: string;
  phoneNumber2?: string;
  notes?: string;
  cashOnDelivery?: number;
  items: TaagerOrderItem[];
}

export type TaagerAccountName = "ACCOUNT_ONE" | "ACCOUNT_TWO";

const TAAGER_ACCOUNTS = {
  ACCOUNT_ONE: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY4NTFkM2NhMjllMTYzOWYwYjc1NDkxMiIsImVtYWlsIjoiYmFoYW91aXRhYWdlckBnbWFpbC5jb20iLCJUYWdlcklEIjoxODkyMTEwLCJ1c2VyTGV2ZWwiOjEsInVzZXJuYW1lIjoiYmFoYW91aXRhYWdlckBnbWFpbC5jb20iLCJwaG9uZU51bWJlciI6eyJfdmFsdWUiOiIyMTI2NDUzMTQ1OTAiLCJfY2FsbGluZ0NvZGUiOiIyMTIifSwidmVyaWZpY2F0aW9uU3RhdGUiOnsicGhvbmVOdW1iZXJWZXJpZmllZCI6dHJ1ZSwibWVyY2hhbnREYXRhVmVyaWZpZWQiOnRydWUsImVtYWlsVmVyaWZpZWQiOnRydWUsIm1lcmNoYW50SWRWZXJpZmllZCI6ZmFsc2V9LCJhY3R1YWxWZXJpZmljYXRpb25TdGF0ZSI6eyJyZWdpc3RyYXRpb25Db21wbGV0ZWQiOnRydWUsInBob25lTnVtYmVyVmVyaWZpZWQiOnRydWUsIm1lcmNoYW50RGF0YVZlcmlmaWVkIjp0cnVlLCJlbWFpbFZlcmlmaWVkIjp0cnVlLCJtZXJjaGFudElkVmVyaWZpZWQiOmZhbHNlfSwic3RvcmVzIjpbXSwiZmVhdHVyZXMiOlsibXVsdGl0ZW5hbmN5IiwibXVsdGl0ZW5hbmN5X3VhZSIsImJ1bGtfcHJlb3JkZXJfZXhwZXJpbWVudCIsInNrdV9hbmFseXRpY3NfZWd5Iiwic2t1X2FuYWx5dGljc19zYXUiLCJza3VfYW5hbHl0aWNzX2FyZSIsInN0b2NrX2F2YWlsYWJpbGl0eV9lZ3kiLCJzdG9ja19hdmFpbGFiaWxpdHlfc2F1IiwiZHVrYW5fZWd5IiwiZHVrYW5fYXJlIiwiZHVrYW5fdG10IiwieW91Y2FuX3NhdSIsInlvdWNhbl9lZ3kiLCJ5b3VjYW5fYXJlIiwibWVyY2hhbnRfaW5zaWdodHMiLCJtdWx0aXRlbmFuY3lfaXJhcSIsImNwYV9jYWxjdWxhdG9yIiwiYnJlYWtfZXZlbl9tZXJjaGFudF9pbnNpZ2h0cyIsImR1a2FuX2lycSIsImZhaWxlZF9vcmRlcnMiLCJwcmVvcmRlcl9zYXUiLCJ3aXRoZHJhd2FsX290cCIsImR5bmFtaWNfaW5jZW50aXZlX3Byb2dyYW0iLCJyZWZlcnJhbF9wcm9ncmFtIiwibG95YWx0eV9wcm9ncmFtIiwibWFya2V0LXBsYWNlLW5vdGlmaWNhdGlvbnMtbG9jay11cGRhdGVzIiwic3RvcmVzX3JldmFtcCIsIndvb19jb21tZXJjZV9zdG9yZSIsIndlYl9uZXdfaG9tZXBhZ2UiLCJ0ZWxlc2FsZXMtZm9yLW1lcmNoYW50Il19LCJpYXQiOjE3NTkzMDgxMzEsImV4cCI6MTc1OTM5NDUzMX0.kd-SOuJPVsoI8QHXvVi9QEXIPgBMzBHKvHIKt1FYNaE",
    taagerId: "1892110",
  },
  ACCOUNT_TWO: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY4YmY2YTEzMDgxZDU0NWFmMjUyYzY2YSIsImVtYWlsIjoiZWxiYWhhb3Vpc2ltb0BnbWFpbC5jb20iLCJUYWdlcklEIjoxOTY2NDM1LCJ1c2VyTGV2ZWwiOjEsInVzZXJuYW1lIjoiZWxiYWhhb3Vpc2ltb0BnbWFpbC5jb20iLCJwaG9uZU51bWJlciI6eyJfdmFsdWUiOiIyMTI2MTcwNzkwMzgiLCJfY2FsbGluZ0NvZGUiOiIyMTIifSwidmVyaWZpY2F0aW9uU3RhdGUiOnsicGhvbmVOdW1iZXJWZXJpZmllZCI6dHJ1ZSwibWVyY2hhbnREYXRhVmVyaWZpZWQiOnRydWUsImVtYWlsVmVyaWZpZWQiOnRydWUsIm1lcmNoYW50SWRWZXJpZmllZCI6ZmFsc2V9LCJhY3R1YWxWZXJpZmljYXRpb25TdGF0ZSI6eyJyZWdpc3RyYXRpb25Db21wbGV0ZWQiOnRydWUsInBob25lTnVtYmVyVmVyaWZpZWQiOnRydWUsIm1lcmNoYW50RGF0YVZlcmlmaWVkIjp0cnVlLCJlbWFpbFZlcmlmaWVkIjp0cnVlLCJtZXJjaGFudElkVmVyaWZpZWQiOmZhbHNlfSwic3RvcmVzIjpbXSwiZmVhdHVyZXMiOlsibXVsdGl0ZW5hbmN5IiwibXVsdGl0ZW5hbmN5X3VhZSIsImJ1bGtfcHJlb3JkZXJfZXhwZXJpbWVudCIsInNrdV9hbmFseXRpY3NfZWd5Iiwic2t1X2FuYWx5dGljc19zYXUiLCJza3VfYW5hbHl0aWNzX2FyZSIsInN0b2NrX2F2YWlsYWJpbGl0eV9lZ3kiLCJzdG9ja19hdmFpbGFiaWxpdHlfc2F1IiwiZHVrYW5fZWd5IiwiZHVrYW5fYXJlIiwiZHVrYW5fdG10IiwieW91Y2FuX3NhdSIsInlvdWNhbl9lZ3kiLCJ5b3VjYW5fYXJlIiwibWVyY2hhbnRfaW5zaWdodHMiLCJtdWx0aXRlbmFuY3lfaXJhcSIsImNwYV9jYWxjdWxhdG9yIiwiYnJlYWtfZXZlbl9tZXJjaGFudF9pbnNpZ2h0cyIsImR1a2FuX2lycSIsImZhaWxlZF9vcmRlcnMiLCJwcmVvcmRlcl9zYXUiLCJ3aXRoZHJhd2FsX290cCIsImR5bmFtaWNfaW5jZW50aXZlX3Byb2dyYW0iLCJyZWZlcnJhbF9wcm9ncmFtIiwibG95YWx0eV9wcm9ncmFtIiwibWFya2V0LXBsYWNlLW5vdGlmaWNhdGlvbnMtbG9jay11cGRhdGVzIiwic3RvcmVzX3JldmFtcCIsIndvb19jb21tZXJjZV9zdG9yZSIsIndlYl9uZXdfaG9tZXBhZ2UiXX0sImlhdCI6MTc1OTMwODI2MCwiZXhwIjoxNzU5Mzk0NjYwfQ.4d7DL4_8WKmT-zupf-YV0VJm459GDsruhAoNc27YIA8",
    taagerId: "183770",
  },
};

const TAAGER_API_URL =
  "https://merchant.api.taager.com/api/order/makeOrderByCart";

export async function sendOrderToTaager(
  data: TaagerOrderData,
  accountName: TaagerAccountName,
): Promise<{ success: boolean; error?: string }> {
  try {
    const selectedAccount = TAAGER_ACCOUNTS[accountName];
    if (!selectedAccount) {
      throw new Error(`Invalid Taager account name provided: ${accountName}`);
    }

    console.log(`Sending order to Taager using ${accountName}:`, data);

    const notesForAccount =
      accountName === "ACCOUNT_TWO"
        ? ""
        : data.notes ||
          "يرجى إخبار العميل بأنه حصل على خصم إضافي بقيمة 10 ريال سعودي (لا تخصم أي شيء من السعر. لقد خصمنا ذلك بالفعل عند تحميل الطلب)\n\n";

    const body = {
      products: data.items.map((item) => item.productId),
      productQuantities: data.items.map((item) => item.quantity),
      productPrices: data.items.map((item) => item.price),
      productIds: data.items.map(() => data.productId),
      merchantOrderPreferences: {
        isFreeShippingPreferred: true,
        isProfitDiscountPreferred: true,
        preferredProfitDiscountPercentage: 20,
      },
      receiverName: data.receiverName,
      province: data.province || "منطقة الرياض",
      streetName: data.streetName || "اسأل العميل عن العنوان",
      phoneNumber: data.phoneNumber,
      phoneNumber2: data.phoneNumber2 || "",
      notes: notesForAccount,
      orderSource: {
        pageName: "",
        pageUrl: "",
      },
      orderProfit: 0,
      cashOnDelivery: data.cashOnDelivery,
      isUtmAttributedOrder: false,
    };

    const response = await fetch(TAAGER_API_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "accept-language": "ar",
        authorization: `Bearer ${selectedAccount.token}`,
        "content-type": "application/json",
        country: "SAU",
        platform: "web",
        taagerid: selectedAccount.taagerId,
        Referer: "https://www.taager.com/",
      },
      body: JSON.stringify(body),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.log("Taager API request failed:", response.status, responseData);
      return {
        success: false,
        error: `Taager API Error: ${response.status} - ${JSON.stringify(
          responseData,
        )}`,
      };
    }

    console.log("Successfully sent order to Taager. Response:", responseData);
    return { success: true };
  } catch (error) {
    console.error("Error sending order to Taager:", error);
    return {
      success: false,
      error: `Failed to send order to Taager: ${(error as Error).message}`,
    };
  }
}
