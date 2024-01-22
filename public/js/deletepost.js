async function deleteFormHandler(event) {
    event.preventDefault();
  
    const post_id = window.location.toString().split("/").pop();
  
    const response = await fetch(`/api/posts/${post_id}`, { method: "DELETE" });
  
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector(".delete-post-btn").addEventListener("click", deleteFormHandler);
  