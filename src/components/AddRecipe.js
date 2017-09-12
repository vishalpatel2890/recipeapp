import React, { Component } from 'react'
import { Form, Input, Tooltip, Icon, Row, Col, Button, Upload } from 'antd'
import Gap from './Gap'
import Dropzone from 'react-dropzone'
import { withRouter } from 'react-router-dom'
import { postRecipe } from '../actions/recipeActions'
import { connect } from 'react-redux'

const FormItem = Form.Item

class AddRecipeForm extends Component {
  constructor() {
    super()
    this.state = { files: [] }
  }

  componentDidMount() {
    setInterval(() => this.setState({ time: Date.now() }), 1)
  }

  onDrop(files) {
    this.setState({
      files
    })
  }

  handleSubmit = (event, values, props) => {
    event.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        var file = new FormData()
        file.append('image', this.state.files[0])
        file.append('recipename', values.recipename)
        file.append('yields', values.yields)
        file.append('portionsize', values.portionsize)
        this.props.postRecipe(file)
        this.props.form.resetFields()
        this.state = { files: [] }
        this.props.history.push('/recipelist')
      } else {
        console.log(err)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 14,
          offset: 6
        }
      }
    }

    return (
      <div>
        <Gap />
        <Gap />
        <Form onSubmit={this.handleSubmit.bind(this)} id="addform">
          <FormItem {...formItemLayout} label="Recipe Name" hasFeedback>
            {getFieldDecorator('recipename', {
              rules: [
                {
                  type: 'string',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Yield" hasFeedback>
            {getFieldDecorator('yields', {
              rules: [
                {
                  type: 'string',
                  message: 'This is not a number'
                },
                {
                  required: true,
                  message: 'Please enter your yield'
                }
              ]
            })(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={
              <span>
                Portion Size&nbsp;
                <Tooltip title="Unit of measure for each serving">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
            hasFeedback
          >
            {getFieldDecorator('portionsize', {
              rules: [
                {
                  required: false,
                  message: 'Please input your nickname!',
                  whitespace: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <Row>
            <Col span={12}>
              <FormItem {...formItemLayout}>
                <Upload>
                  <Dropzone
                    onDrop={this.onDrop.bind(this)}
                    style={{ borderStyle: 0 }}
                  >
                    {/* <div>Try dropping some files here, or click to select files to upload.</div> */}
                    <Button>
                      <Icon type="upload" /> Click to upload
                    </Button>
                  </Dropzone>
                </Upload>
              </FormItem>
            </Col>
            <Col>
              <div>
                {this.state.files.map(file =>
                  <img key={1} src={file.preview} alt="" width={200} />
                )}
              </div>
            </Col>
          </Row>

          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Add The Recipe
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    postRecipe: file => dispatch(postRecipe(file))
  }
}

const AddRecipe = Form.create()(AddRecipeForm)

export default connect(null, mapDispatchToProps)(withRouter(AddRecipe))
