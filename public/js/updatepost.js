const editFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('textarea[name="post-content"]').value.trim();
    const post_id = window.location.toString().split("/").pop();
  
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "PUT",
      body: JSON.stringify({ title, post_content }),
      headers: { "Content-Type": "application/json" },
    });
  
    response.ok ? document.location.replace("/dashboard") : alert(response.statusText);
  };
  
  document.querySelector(".edit-post-form").addEventListener("submit", editFormHandler);
  