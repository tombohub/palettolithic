import CodeContent from "./CodeContent";

/**
 * Box in which we will render the generated code of chosen framework
 */
function ConfigurationCodeBox() {
  return (
    <div
      id="code-area"
      className="col-span-2 row-span-7 bg-gray-900 text-sm text-gray-100 p-2 rounded overflow-auto"
    >
      <CodeContent />
    </div>
  );
}

export default ConfigurationCodeBox;
