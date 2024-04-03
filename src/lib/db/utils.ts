// check if a wallet address is the users table
export async function isWalletAddressAvailable(walletAddress: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/check-wallet-address?walletAddress=${walletAddress}`,
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

// check if a username exist in the table
export async function checkUsernameExists(username: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/check-username?username=${username}`,
    );
    const data = await response.json();
    if (response.status === 200) {
      // username exist, return true
      return true;
    } else if (response.status === 409) {
      // username does not exist, return false
      return false;
    }
  } catch (error) {
    console.error("Error checking username availability:", error);
    return false;
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

      const data = await response.json();

      if (!response.ok) {
        // Show an error message
        console.error("Error: " + data.error);
        throw new Error(data.error || "An error occurred");
      }

      // Reset form fields or show a success message
      console.log(data.message);
      console.log("Sucess: User added");

      return true;
    } catch (error: any) {
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
