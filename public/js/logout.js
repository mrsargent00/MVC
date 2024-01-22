const deleteFormHandler = async (event) => {
    event.preventDefault();
  
    const post_id = window.location.toString().split("/").slice(-1)[0];
  
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "DELETE",
    });
  
    response.ok ? document.location.replace("/dashboard") : alert(response.statusText);
  };
  
  document.querySelector(".delete-post-btn").addEventListener("click", deleteFormHandler);
  