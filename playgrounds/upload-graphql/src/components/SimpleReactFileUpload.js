import React from "react";

class SimpleReactFileUpload extends React.Component {
  state = {
    file: null
  };

  onFormSubmit = e => {
    // Stop form submit
    e.preventDefault();
    this.onFileUpload();
  };

  onChange = e => this.setState({ file: e.target.files[0] });

  onFileUpload = () => {
    let data = new FormData();
    data.append("data", this.state.file);

    fetch(process.env.REACT_APP_GRAPHCOOL_FILE_ENDPOINT, {
      method: "POST",
      body: data
    })
      .then(response => {
        console.log("file upload response", response);
        return response.json();
      })
      .then(file => {
        const fileId = file.id;
        console.log(fileId);
      })
      .catch(err => console.log(err));
  };

  render () {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={this.onChange} />

        <button type="submit">Upload</button>
      </form>
    );
  }
}

export default SimpleReactFileUpload;
