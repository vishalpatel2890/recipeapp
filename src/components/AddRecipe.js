import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Row, Col, Button, Upload } from 'antd';
import Gap from './Gap'
import Dropzone from 'react-dropzone';
import request from 'superagent';

const FormItem = Form.Item;

// function handleResponse(response) {
//   return response.json()
//     .then(json => {
//       if (response.ok) {
//         return json
//       } else {
//         return Promise.reject(json)
//       }
//     })
// }

class AddRecipeForm extends Component {

  constructor() {
   super()
   this.state = { files: [] }
 }

  onDrop(files) {
     this.setState({
       files
     });
     console.log(this.state.files)

   }

    handleSubmit = (event, files, values) => {

      event.preventDefault();

      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          var file = new FormData();
          file.append('image', this.state.files[0])
          file.append('recipename', values.recipename)
          file.append('yields', values.yields)
          file.append('portionsize', values.portionsize)
          var req=request
                    .post('https://quiet-citadel-22666.herokuapp.com/recipes/')
                    .send(file);
          req.end(function(err,response){
              console.log(err);
            });
          this.props.form.resetFields();
          this.state = { files: [] }
          }
          else {
            console.log(err)
          }
        });
      }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    return (
      <div>
      <Gap />
      <Gap />
      <Form onSubmit={this.handleSubmit} id="addform">
        <FormItem
          {...formItemLayout}
          label="Recipe Name"
          hasFeedback
        >
          {getFieldDecorator('recipename', {
            rules: [{
              type: 'string', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Yield"
          hasFeedback
        >
          {getFieldDecorator('yields', {

            rules: [{
              type: 'number', message: 'This is not a number',
            },{
              required: true, message: 'Please enter your yield',
            },
          ],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Portion Size&nbsp;
              <Tooltip title="Unit of measure for each serving">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('portionsize', {
            rules: [{ required: false, message: 'Please input your nickname!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <Row>
          <Col span={12}>
        <FormItem {...formItemLayout} >
          <Upload>
          <Dropzone onDrop={this.onDrop.bind(this)} style={{borderStyle:0}}>
            {/* <div>Try dropping some files here, or click to select files to upload.</div> */}
            <Button>
                <Icon type="upload" /> Click to upload
              </Button>
          </Dropzone>
        </Upload>
        </FormItem>
      </Col>
          <Col>
            <div>{this.state.files.map((file) => <img key={1} src={file.preview} width={200}/> )}</div>

          </Col>
        </Row>


        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Add Recipe</Button>
        </FormItem>
      </Form>
    </div>
    );
  }
}

const AddRecipe = Form.create()(AddRecipeForm);

export default AddRecipe
