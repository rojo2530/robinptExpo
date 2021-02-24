import * as React from "react"
import * as Testrenderer from "react-test-renderer"
import Title from "../../../src/components/title/title";
import { Colors } from "../../../src/utils/constants";


describe("<Title />", () => {
  it("has 0 child", () => {
    const tree: any = Testrenderer.create(<Title />).toJSON();
    expect(tree.children).toBe(null);
  });

  it("Match SnapShot", () => {
    const title: any = Testrenderer.create(<Title />);
    expect(title.toJSON()).toMatchSnapshot();
  });

  it("has default props", () => {
    const title: any = Testrenderer.create(<Title />);
    const instance = title.root;
    const findAllByNumberOfLines = (instance: any) => instance.findAll((el: any) => 
      el.props.numberOfLines === 3 &&
      el.type === 'Text'
    );

    const text = instance.findByType("Text");
    expect(text.props.style).toHaveProperty("fontSize", 22);
    expect(text.props.style).toHaveProperty("color", Colors.grayscale.BLACK);
    expect(findAllByNumberOfLines(instance).length).toEqual(1);
  });
});