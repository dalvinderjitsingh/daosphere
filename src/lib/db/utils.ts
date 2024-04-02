// check if a wallet address is the users table
export async function isWalletAddressAvailable(walletAddress: string) {
  try {
    const response = await fetch(
      `/api/users/check-wallet-address?walletAddress=${walletAddress}`,
    );

    const data = await response.json();

    if (!response.ok) {
      // Show an error message
      console.error("Error: " + data.error);
      throw new Error(data.error || "An error occurred");
    }

    if (response.status === 200) {
      // wallet address exists, handle accordingly
      console.log("Wallet address already exist in users table");
      return true;
    } else if (response.status === 404) {
      // wallet address does not exist, handle accordingly
      console.log("Wallet address does not exist in users table");
      return false;
    }
  } catch (error) {
    console.error(
      "Error checking wallet address availability in users table:",
      error,
    );
    return;
  }
}

// add new user to users table
export async function addNewUser(
  name: string,
  username: string,
  wallet_address: string,
) {
  {
    try {
      console.log("addnewuser error 1");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/add-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, username, wallet_address }),
        },
      );
      console.log("addnewuser error 2");

      const data = await response.json();

      if (!response.ok) {
        console.log("addnewuser error 3");

        // Show an error message
        console.error("Error: " + data.error);
        throw new Error(data.error || "An error occurred");
        console.log("addnewuser error 4");
      }

      // Reset form fields or show a success message
      console.log(data.message);
      console.log("user created on postgres!! Yahooooo!!!!! Cool!!!!");
      console.log("addnewuser error 5");

      return true;
    } catch (error: any) {
      console.log("addnewuser error 6");

      // Show an error message
      console.error("Error: " + error.message);

      // Differentiate between network errors and server-side errors
      if (error.name === "TypeError") {
        console.error("Network error:", error.message);
      } else {
        console.error("Server-side error:", error.message);
      }
    }
  }
}
// check if a username is available
export async function checkUsernameAvailability(username: string) {
  try {
    const response = await fetch(`/api/check-username?username=${username}`);
    const data = await response.json();
    if (response.status === 200) {
      // username does not exist, return true
      return true;
    } else if (response.status === 409) {
      // username already exist, throw error
      return false;
    }
  } catch (error) {
    console.error("Error checking username availability:", error);
    return false;
  }
}
