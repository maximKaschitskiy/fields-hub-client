const getUrl = async (url) => {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Failed to fetch from ${url}: ${res.status} ${res.statusText}`);
    }
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("CORS")) {
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Max-Age": "86400"
        },
      });
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`Failed to fetch from ${url}: ${res.status} ${res.statusText}`);
      }
    } else {
      throw error;
    }
  }
};

export {getUrl}