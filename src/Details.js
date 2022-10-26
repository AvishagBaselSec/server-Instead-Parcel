import { Component } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "./Carousel.js";
import { ErrorBoundery } from "./ErrorBoundery.js";
import { Modal } from "./Modal.js";
import { themeContext } from "./ThemeContext.js";

class Detail extends Component {
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  render() {
    if (this.state.loading) {
      return <h2>loading ...</h2>;
    }

    if (!(this.state.animal || this.state.state)) {
      throw new Error("lnao you creashed");
    }

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city}, {state}
          </h2>
          <themeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </themeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name} ?</h1>
                <div className="buttons">
                  <a href="https://bit.ly/pet-adopt">Yes</a>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export const WrappedDetails = () => {
  const params = useParams();
  return (
    <ErrorBoundery>
      <Detail params={params} />
    </ErrorBoundery>
  );
};

//export default WrappedDetails;
