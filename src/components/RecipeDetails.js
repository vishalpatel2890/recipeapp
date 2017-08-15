import React, { Component } from 'react';
import '../App.css'
import { fetchRecipe, fetchSteps, fetchStepsIngr, fetchIngredients, clearRedux } from '../actions/recipeActions';
import { Tabs, Button, Row, Col, Upload, Icon, message, Checkbox} from 'antd';
import { connect } from 'react-redux';


const TabPane = Tabs.TabPane;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}


class RecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'left',
    }
      this.setState = {
        ingredients : [],
        steps : [],
      };
      // this.props.fetchIngredients('https://quiet-citadel-22666.herokuapp.com/ingredients/')
    }

    componentWillMount = (props) => {
      this.props.clearRedux()
      this.setSate = {
        ingredients : null
      }
      const recipeid = parseInt(this.props.match.params.recipeid, 10)

        if (!recipeid) {
          return <div>Sorry, but the player was not found</div>
        }
      this.props.fetchStepsIngr(`https://quiet-citadel-22666.herokuapp.com/stepsearch/x/?recipeid=${recipeid}`, `https://quiet-citadel-22666.herokuapp.com/ingredientsearch/x/?recipeid=${recipeid}`);

    }

  handleModeChange = (e) => {
    const mode = e.target.value;
    this.setState({ mode });
  }

  handleChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, );
    }
  }

  render() {
    const { mode } = this.state;
    const {steps} = this.props;
    const {ingredients} = this.props;

    console.log({steps})
    console.log({ingredients})
    return (


      <div>
        {/* <Radio.Group onChange={this.handleModeChange} value={mode} style={{ marginBottom: 8 }}>
          <Radio.Button value="top">Horizontal</Radio.Button>
          <Radio.Button value="left">Vertical</Radio.Button>
        </Radio.Group> */}
      <Tabs defaultActiveKey="0" onEdit={this.onEdit} tabPosition={mode}>
            <TabPane tab="Ingredients" key="0">
              <Row gutter={8}>
                <Col span={12}>

                  <ul className="ingredients-ul">
                      {ingredients.map(ingredient=>
                        <li key={ingredient.id}><Checkbox className="ingredients" >{ingredient.ingredient}</Checkbox></li>)}
                  </ul>
                </Col>
                <Col span={12}><Button type="primary">Button</Button></Col>
              </Row>
            </TabPane>
              {steps.map(step=> <TabPane key={step.stepno} key={step.stepno} tab={step.stepno}  >
                <Row gutter={8}>
                  <Col span={12} className="steps">
                    {step.steps}
                  </Col>
                  <Col span={12}>
                    <Upload className="avatar-uploader" name="avatar" showUploadList={false} beforeUpload={beforeUpload} action="//jsonplaceholder.typicode.com/posts/">
                    {
                     step.step_image ?
                     <img src={step.step_image} alt="" className="avatar" /> :
                     <Icon type="plus" className="avatar-uploader-trigger" />
                    }
                  </Upload>
                </Col>
              </Row>
            </TabPane>)}
</Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

    // recipes: state.recipe,
    ingredients: state.ingredients,
    steps: state.steps,


  }
}

  function mapDispatchToProps(dispatch) {
    return {

      // fetchRecipe: (url) => dispatch(fetchRecipe(url)),
      // fetchSteps: (url) => dispatch(fetchSteps(url)),
      fetchStepsIngr: (urls, urli) => dispatch(fetchStepsIngr(urls,urli)),
      // fetchIngredients: (urli) => dispatch(fetchIngredients(urli))
      clearRedux: () => dispatch(clearRedux())

    }
  }


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeDetails)
