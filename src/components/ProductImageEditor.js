import "tui-image-editor/dist/tui-image-editor.css"
import "tui-color-picker/dist/tui-color-picker.css"
import ImageEditor from "@toast-ui/react-image-editor"
import FileSaver from 'file-saver' // eslint-disable-line no-unused-vars

const myTheme = {}

const ProductImageEditor = () => {
  return (
    <div className="row">
      <div className="col d-flex justify-content-center align-items-center mt-5 mb-5">
        <ImageEditor
          includeUI={{
            loadImage: {
              path: "",
              name: "SampleImage",
            },
            theme: myTheme,
            menu: [
              "resize",
              "crop",
              "flip",
              "rotate",
              "draw",
              "shape",
              "icon",
              "text",
              "mask",
              "filter",
            ],
            initMenu: "filter",
            uiSize: {
              width: "1000px",
              height: "700px",
            },
            menuBarPosition: "left",
          }}
          cssMaxHeight={500}
          cssMaxWidth={700}
          selectionStyle={{
            cornerSize: 20,
            rotatingPointOffset: 70,
          }}
          usageStatistics={true}
        />
      </div>
    </div>
  )
}

export default ProductImageEditor