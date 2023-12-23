
function findNXM(node) {
    if (node.hasAttribute && node.getAttribute) {
        if (node.hasAttribute("id") && node.getAttribute("id") === "dl_link") {
            return node.getAttribute("value");
        }
    }

    if (node.childNodes) {
        for (let x = 0; x < node.childNodes.length; x++) {
            const found = findNXM(node.childNodes[x]);

            if (found) {
                return found;
            }
        }
    }

    return undefined;
}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            for (let x = 0; x < mutation.addedNodes.length; x++) {
                const newNode = mutation.addedNodes[x];
                const nxm = findNXM(newNode);

                if (!nxm) {
                    continue;
                }

                console.log("Found NXM link!");
                setTimeout(() => {
                    const buttonLabel = document.createElement("span");
                    buttonLabel.classList.add("flex-label");
                    buttonLabel.innerText = "Copy NXM URL";

                    const copyButton = document.createElement("a");
                    copyButton.classList.add("btn", "inline-flex");
                    copyButton.style.margin = "10px 5px";
                    copyButton.onclick = (event) => {
                        navigator.clipboard.writeText('nxm "' + nxm + '"');
                    }
                    copyButton.appendChild(buttonLabel);

                    document.getElementById("dl_button").insertAdjacentElement("afterend", copyButton);
                    console.log("Injected copy NXM button.");
                });
            }
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

console.log("NXM-Revealer Loaded.")
