import puppeteer from "puppeteer";

const init = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
    });

    const page = await browser.newPage();
    await page.goto('https://www.linkedin.com/');

    const setWindowSize = async () => {
        await page.setViewport({ width: 1080, height: 1024 });
    };

    const enterCredentials = async () => {
        await page.type('#session_key', 'nuoya1996@gmail.com');
        await page.type('#session_password', '!Sr19960309');
    };

    const login = async () => {
        const selector = "[data-id='sign-in-form__submit-btn']";
        await page.waitForSelector(selector);
        await page.click(selector);
    };

    const navToJobs = async () => {
        const selector = "[title='Jobs']";
        await page.waitForSelector(selector);
        await page.click(selector);
    };

    const navToRecentJobSearch = async () => {
        const selector = ".jobs-home-recent-searches__list-item";
        await page.waitForSelector(selector);
        await page.click(selector);
    };

    const ezApplyBtnClick = async () => {
        const selector = ".jobs-s-apply";
        await page.waitForSelector(selector);
        await new Promise((resolve) => { setTimeout(resolve, 5000) });
        await page.click(selector);
    };

    const apply = async () => {
        const modalSelector = '.artdeco-modal__content';
        const modal = await page.$(modalSelector);
        const postApplyModal = await page.$('[aria-labelledby="post-apply-loading-modal__title"]');
        const footer = await modal.$('footer');
        const button = await footer.$('button.artdeco-button--primary');

        if (postApplyModal) {
            const returnBtn = await postApplyModal.$('button');
            await new Promise((resolve) => { setTimeout(resolve, 2000) });
            await returnBtn.click();

            return;
        }

        if (!modal) return;

        await new Promise((resolve) => { setTimeout(resolve, 2000) });
        await button.click();

        await apply();


        // const nextSelector = '[aria-label="Continue to next step"]';
        // const subtmitSelector = '[aria-label="Submit application"]';

        // const nextBtn = await page.$(nextSelector);
        // const submitBtn = await page.$(subtmitSelector);

        // if (!nextBtn) return;

        // await new Promise((resolve) => { setTimeout(resolve, 2000) });

        // if (nextBtn) {
        //     await nextBtn.click();
        // } else if (submitBtn) {
        //     await nextBtn.click();
        //     return;
        // }

        // apply();
    }

    setWindowSize()
        .then(() => enterCredentials())
        .then(() => login())
        .then(() => navToJobs())
        .then(() => navToRecentJobSearch())
        .then(() => ezApplyBtnClick())
        .then(() => apply())


    // const jobSelector = ".jobs-s-apply";
    // await page.waitForSelector(jobSelector);
    // const elements = await page.$$(jobSelector);
    // await new Promise(function (resolve) { setTimeout(resolve, 5000) });
    // await elements[0].click();

    // const nextBtnSelector = '[aria-label="Continue to next step"]';
    // await page.waitForSelector(nextBtnSelector);
    // await page.click(nextBtnSelector);

    // await new Promise(function (resolve) { setTimeout(resolve, 2000) });
    // const newnextBtnSelector = '[aria-label="Continue to next step"]';
    // await page.waitForSelector(newnextBtnSelector);
    // await page.click(nextBtnSelector);



};

init();