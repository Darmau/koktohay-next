import { Fragment, useEffect } from 'react';

declare global {
  interface Window {
    REMARK42: any;
    remark_config: any;
  }
}

const insertScript = (id: string, parentElement: HTMLElement) => {
  const script = window.document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.id = id;

  let url = window.location.origin + window.location.pathname;
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }
  // Now the actual config and script-fetching function:
  script.innerHTML = `
    var remark_config = {
      host: "https://comment.darmau.design",
      site_id: "darmau.design",
      url: "${url}",
      theme: "light",
      locale: "zh",
      components: ["embed"],
      no_footer: true,
    };
    !function(e,n){for(var o=0;o<e.length;o++){var r=n.createElement("script"),c=".js",d=n.head||n.body;"noModule"in r?(r.type="module",c=".mjs"):r.async=!0,r.defer=!0,r.src=remark_config.host+"/web/"+e[o]+c,d.appendChild(r)}}(remark_config.components||["embed"],document);`;
  parentElement.appendChild(script);
};

const removeScript = (id: string, parentElement: HTMLElement) => {
  const script = window.document.getElementById(id);
  if (script) {
    parentElement.removeChild(script);
  }
};

const manageScript = () => {
  if (!window) {
    return () => {};
  }
  const { document } = window;
  if (document.getElementById('remark42')) {
    insertScript('comments-script', document.body);
  }
  return () => removeScript('comments-script', document.body);
};

const recreateRemark42Instance = () => {
  if (!window) {
    return;
  }
  const remark42 = window.REMARK42;
  if (remark42) {
    remark42.destroy();
    remark42.createInstance(window.remark_config);
  }
};

type CommentsProps = {
  location: string;
};

// The location prop is {props.location.pathname} from the parent component.
// I.e. invoke the component like this in the parent: <Comments location={props.location.pathname} />
export function Comments({ location }: CommentsProps) {
  // Insert the two useEffect hooks. Maybe you can combine them into one? Feel free if you want to.
  useEffect(manageScript, [location]);
  useEffect(recreateRemark42Instance, [location]);

  return (
    <Fragment>
      <h2 className="text-lg font-bold">评论</h2>
      {/* This div is the target for actual comments insertion */}
      <div id="remark42" />
    </Fragment>
  );
}