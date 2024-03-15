import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  Pressable,
} from 'react-native';
import {Spinner, useToast, Modal, Checkbox} from 'native-base';
import axios from 'axios';

import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Color, FontFamily, height, width} from '../../../config/GlobalStyles';
import {backendHost} from '../../../Components/apiConfig';
import {useSelector} from 'react-redux';
import RenderHTML from 'react-native-render-html';
import NotificationIcon from '../../../assets/images/Notification.svg';
import ContentLoader from '../../../Components/ContentLoader';
const SubmitArticle = () => {
  const userData = useSelector(state => state.profile.data);
  const user = userData.registration_id;

  const toast = useToast();
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [article, setArticle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [copyright, setCopyright] = useState(11);
  const [regType, setRegType] = useState();
  const [privacy, setPrivacy] = useState(false);
  const [terms, setTerms] = useState(false);
  const source = {
    html: `
    <h2 className="cols__main-title cols__main-title--top container">PLEASE READ THESE TERMS AND CONDITIONS OF USE CAREFULLY BEFORE USING THIS SITE.</h2><br/>
    <p className="p1 container">By using this site, you signify your assent to these Terms and Conditions. If you do not agree to all of these Terms and Conditions, do not use this site!<br/>
Etherium Technologies, the owner and publisher of All-cures.com ("AC") may revise and update these Terms and Conditions at any time. Your continued usage of the all-cures.com website ("AC Site," or the "Site,") will mean you accept those changes.

</p><br/>
<h2 className="cols__main-title cols__main-title--top container">The Site Does Not Provide Medical Advice</h2>
<p className="p1 container">The contents of the All-cures.com Site, such as text, graphics, images, and other materials created by Etherium Technologies or obtained from Etherium Technologies’ licensors, and other materials contained on the All-cures.com Site (collectively, "Content") are for informational purposes only. The Content is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on the All-cures.com Site!<br/>
If you think you may have a medical emergency, call your doctor or Emergency immediately. All-cures.com does not recommend or endorse any specific tests, physicians, products, procedures, opinions, or other information that may be mentioned on the Site. Reliance on any information provided by all-cures.com, all-cures.com employees, others appearing on the Site at the invitation of all-cures.com, or other visitors to the Site is solely at your own risk.</p><br/>

<h2 className="cols__main-title cols__main-title--top container">Children's Privacy</h2>
<p className="p1 container">We are committed to protecting the privacy of children. You should be aware that this Site is not intended or designed to attract children under the age of 13. We do not collect personally identifiable information from any person we actually know is a child under the age of 13.</p><br/>

<h2 className="cols__main-title cols__main-title--top container">Use of the Content</h2>
<p className="p1 container">The Content posted on this Site is protected by the copyright laws inIndia and in foreign countries. All-cures.com authorizes you to view or download a single copy of the Content solely for your personal, non-commercial use if you include the copyright notice located at the end of the material, for example: "©2016, All-cures.com. All rights reserved" and other copyright and proprietary rights notices that are contained in the Content. Any special rules for the use of certain software and other items accessible on the All-cures.com Site may be included elsewhere within the Site and are incorporated into these Terms and Conditions by reference.<br/>
Title to the Content remains with All-cures.com or its licensors. Any use of the Content not expressly permitted by these Terms and Conditions is a breach of these Terms and Conditions and may violate copyright, trademark, and other laws. Content and other features are subject to change or termination without notice in the editorial discretion of All-cures.com. All rights not expressly granted herein are reserved to All-cures.com and its licensors.<br/>
If you violate any of these Terms and Conditions, your permission to use the Content automatically terminates and you must immediately destroy any copies you have made of any portion of the Content.</p><br/>
<h2 className="cols__main-title cols__main-title--top container">Liability of All-cures.com and Its Licensors</h2>
<p className="p1 container">The use of the All-cures.com Site and the Content is at your own risk.<br/>
When using the All-cures.com Site, information will be transmitted over a medium that may be beyond the control and jurisdiction of All-cures.com and its suppliers. Accordingly, All-cures.com assumes no liability for or relating to the delay, failure, interruption, or corruption of any data or other information transmitted in connection with use of the All-cures.com Site.<br/>
The All-cures.com Site and the Content are provided on an "as is" basis. All-cures.com, ITS LICENSORS, AND ITS SUPPLIERS, TO THE FULLEST EXTENT PERMITTED BY LAW, DISCLAIM ALL WARRANTIES, EITHER EXPRESS OR IMPLIED, STATUTORY OR OTHERWISE, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT OF THIRD PARTIES' RIGHTS, AND FITNESS FOR PARTICULAR PURPOSE. Without limiting the foregoing, All-cures.com, its licensors, and its suppliers make no representations or warranties about the following:<br/>
1.	The accuracy, reliability, completeness, currentness, or timeliness of the Content, software, links, or communications provided on or through the use of the All-cures.com Site or All-cures.com.<br/>
2.	The satisfaction of any government regulations requiring disclosure of information on prescription drug products or the approval or compliance of any software tools with regard to the Content contained on the All-cures.com Site.<br/>
In no event shall All-cures.com, its licensors, its suppliers, or any third parties mentioned on the All-cures.com Site be liable for any damages (including, without limitation, incidental and consequential damages, personal injury/wrongful death, lost profits, or damages resulting from lost data or business interruption) resulting from the use of or inability to use the All-cures.com Site or the Content, whether based on warranty, contract, tort, or any other legal theory, and whether or not All-cures.com , its licensors, its suppliers, or any third parties mentioned on the All-cures.com Site are advised of the possibility of such damages. All-cures.com, its licensors, its suppliers, or any third parties mentioned on the All-cures.com Site are not liable for any personal injury, including death, caused by your use or misuse of the Site, Content, or Public Areas (as defined below). </p><br/>

<h2 className="cols__main-title cols__main-title--top container">User Content and Submissions</h2>
<p className="p1 container">The personal information you submit to AllCures-Info.com is governed by the All-cures.com Privacy Policy. To the extent there is an inconsistency between this Agreement and the All-cures.com Privacy Policy, this Agreement shall govern.<br/>
The Site contains functionality and other interactive areas, including blogs, user reviews and comments on information, user reviews on the Physician Directory, etc. (collectively "Public Areas") that allow users to post or upload content and other information, including comments, images, questions, reviews, and other materials (the “User Content”).  Users may also upload User Content via our official brand presence on social media platforms and branded hashtags, including, without limitation Facebook, Twitter, Google Plus, YouTube, Instagram, and Pinterest, (collectively "Social Media Platforms"). You agree that you will not post, upload, or transmit any communications or User Content of any type to the Public Areas or Social Media Platforms that infringe or violate any rights of any party. By submitting communications or User Content to the Public Areas or Social Media Platforms, you agree to comply with these Terms and Conditions and other applicable polices, such as our Reviews Guidelines.  All-cures.com reserves the right to remove User Content for any reason, including User Content that we believe violates these Terms and Conditions or our other policies, such as our Reviews Guidelines. By submitting any communications or User Content to the Public Areas or Social Media Platforms, you further agree that such submission is non-confidential for all purposes. It is important to note that All-cures.com is not responsible for the operation, terms of use or policies of any Social Media Platform. Before using any Social Media Platform you should review its terms of use and policies, including its privacy policy.</p><br/>

<h2 className="cols__main-title cols__main-title--top container">User Submissions — Image, Video, Audio Files</h2>
<p className="p1 container">You agree to only post or upload media (like photos, videos, or audio) on the All-cures.comSite or a Social Media Platform that you have taken yourself or that you have all rights to transmit and license and which do not violate trademark, copyright, privacy, or any other rights of any other person. Photos or videos of celebrities and cartoon or comic images are usually copyrighted by the owner.<br/>
To protect your privacy, you agree that you will not submit any media that contains Personally Identifiable Information (like name, phone number, email address or web site URL) of you or of anyone else. Uploading media like images or video of other people without their permission is strictly prohibited.<br/>
By uploading any media on the All-cures.com Site or a Social Media Platform, you warrant that you have permission from all persons appearing in your media for you to make this contribution and grant rights described herein. Never post a picture or video of or with someone else unless you have their explicit permission.<br/>
It is strictly prohibited to upload media of any kind that contain expressions of hate, abuse, offensive images or conduct, obscenity, pornography, sexually explicit or any material that could give rise to any civil or criminal liability under applicable law or regulations or that otherwise may be in conflict with these Terms and Conditions, or the All-cures.com Privacy Policy.<br/>
You agree that you will not upload any material that contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer software or this Web site.<br/>
By uploading any media on the All-cures.comSite or a Social Media Platform like a photo or video: (a) you grant to All-cures.com a perpetual, irrevocable, non-exclusive, worldwide, royalty-free, fully sublicensable right and license to use, copy, print, publicly display, reproduce, modify, publish, post, transmit, create derivative works from, and distribute the media and any material included in the media; (b) you certify that any person pictured in the submitted media (or, if a minor, his/her parent/legal guardian) authorizes All-cures.com to use, copy, print, publicly display, reproduce, modify, publish, post, transmit, create derivative works from, and distribute the media and any material included in such media; and (c) you agree to indemnify All-cures.com and its affiliates, directors, officers and employees and hold them harmless from any and all claims and expenses, including attorneys' fees, arising from the media and/or your failure to comply with these Terms and Conditions.<br/>
All-cures.com reserves the right to review all media prior to submission to the site and to remove any media for any reason, at any time, without prior notice, at our sole discretion.</p><br/>

<h2 className="cols__main-title cols__main-title--top container">Passwords</h2>
<p className="p1 container">All-cures.com has several tools that allow you to record and store information. You are responsible for taking all reasonable steps to ensure that no unauthorized person shall have access to your All-cures.com passwords or accounts. It is your sole responsibility to: (1) control the dissemination and use of sign-in name, screen name and passwords; (2) authorize, monitor, and control access to and use of your All-cures.com account and password; (3) promptly inform All-cures.com if you believe your account or password has been compromised or if there is any other reason you need to deactivate a password. To send us an email, use the "Contact Us" links located at the bottom of every page of our site. You grant All-cures.com and all other persons or entities involved in the operation of the Site the right to transmit, monitor, retrieve, store, and use your information in connection with the operation of the Site. All-cures.com cannot and does not assume any responsibility or liability for any information you submit, or your or third parties' use or misuse of information transmitted or received using All-cures.com tools and services.</p><br/>
<h2 className="cols__main-title cols__main-title--top container">Advertisements, Searches, and Links to Other Sites</h2>
<p className="p1 container">All-cures.com may provide links to third-party web sites. All-cures.com also may select certain sites as priority responses to search terms you enter and All-cures.com may agree to allow advertisers to respond to certain search terms with advertisements or sponsored content. All-cures.com does not recommend and does not endorse the content on any third-party websites. All-cures.com is not responsible for the content of linked third-party sites, sites framed within the All-cures.com Site, third-party sites provided as search results, or third-party advertisements, and does not make any representations regarding their content or accuracy. Your use of third-party websites is at your own risk and subject to the terms and conditions of use for such sites. All-cures.com does not endorse any product, service, or treatment advertised on the All-cures.com Site. 
</p><br/>
<h2 className="cols__main-title cols__main-title--top container">Jurisdiction</h2>
<p className="p1 container">You expressly agree that exclusive jurisdiction for any dispute with All-cures.com, or in any way relating to your use of the All-cures.com Site, resides in the courts of Jammu (India) and you further agree and expressly consent to the exercise of personal jurisdiction in the courts of Jammu (India) in connection with any such dispute including any claim involving All-cures.com or its affiliates, subsidiaries, employees, contractors, officers, directors, telecommunication providers, and content providers.<br/>
These Terms and Conditions are governed by the internal substantive laws of the Union Territory of J&K, without respect to its conflict of laws principles. If any provision of these Terms and Conditions is found to be invalid by any court having competent jurisdiction, the invalidity of such provision shall not affect the validity of the remaining provisions of these Terms and Conditions, which shall remain in full force and effect. No waiver of any of these Terms and Conditions shall be deemed a further or continuing waiver of such term or condition or any other term or condition.
</p><br/>
<h2 className="cols__main-title cols__main-title--top container">Complete Agreement</h2>
<p className="p1 container">Except as expressly provided in a particular "legal notice" on the All-cures.com Site, these Terms and Conditions and the All-cures.com Privacy Policy constitute the entire agreement between you and All-cures.com with respect to the use of the All-cures.com Site, and Content.
</p><br/>
<h2 className="cols__main-title cols__main-title--top container">Thank you for your cooperation. We hope you find the All-cures.com Site helpful and convenient to use! </h2>

`,
  };
  const source1 = {
    html: `
  <h2 className="cols__main-title cols__main-title--top container">Introduction</h2>

  <p className="p1 container">
  Welcome to All-Cures. Etherium Technologies hereinafter called as ETPL (“us”, “we”, or “our”) operates<a href="https://www.all-cures.com"> www.all-cures.com </a>(hereinafter referred to as “Service”). Our Privacy Policy governs your visit to <a href="https://www.all-cures.com">www.all-cures.com,</a> and explains how we collect, safeguard and disclose information that results from your use of our Service. We use your data to provide and improve Service. By using Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, the terms used in this Privacy Policy have the same meanings as in our Terms and Conditions. Our Terms and Conditions (“Terms”) govern all use of our Service and together with the Privacy Policy constitutes your agreement with us (“agreement”).</p><br/>
  
  <h2 className="cols__main-title cols__main-title--top" container >Definitions</h2>
  
  <p className="p1" container  >SERVICE means <a href="https://www.all-cures.com">www.all-cures.com </a>
  PERSONAL DATA means data about a living individual who can be identified from those data (or from those and other information either in our possession or likely to come into our possession). USAGE DATA is data collected automatically either generated by the use of Service or from Service infrastructure itself (for example, the duration of a page visit). 
  COOKIES are small files stored on your device (computer or mobile device). 
  DATA CONTROLLER means a natural or legal person who (either alone or jointly or in common with other persons) determines the purposes for which and the manner in which any personal data are, or are to be, processed. For the purpose of this Privacy Policy, we are a Data Controller of your data. 
  DATA PROCESSORS (OR SERVICE PROVIDERS) means any natural or legal person who processes the data on behalf of the Data Controller. We may use the services of various Service Providers in order to process your data more effectively. 
  DATA SUBJECT is any living individual who is the subject of Personal Data. 
  THE USER is the individual using our Service. The User corresponds to the Data Subject, who is the subject of Personal Data.
  </p><br/>
  
  <h2 className="cols__main-title cols__main-title--top container" >Information Collection and Use</h2>
  <p className="p1 container" >We collect several different types of information for various purposes to provide and improve our Service to you.</p><br/>
  
  <h2 className="cols__main-title cols__main-title--top container">Types of Data Collected</h2>
  <p className='p1 container'><b>Personal Data</b><br/>
  While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (“Personal Data”). Personally identifiable information may include, but is not limited to:<br/>
  •	Email address<br/>
  •	First name and last name<br/>
  •	Cookies and Usage Data<br/>
  We may use your Personal Data to contact you with newsletters, marketing or promotional materials and other information that may be of interest to you. You may opt out of receiving any, or all, of these communications from us by emailing us at  <a href="mailto:support@all-cures.com">support@all-cures.com</a>.<br/>
  <b>Usage Data</b><br/>
  We may also collect information that your browser sends whenever you visit our Service or when you access Service by or through a mobile device (“Usage Data”).<br/>
  This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.<br/>
  When you access Service with a mobile device, this Usage Data may include information such as the type of mobile device you use, your mobile device unique ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browser you use, unique device identifiers and other diagnostic data.<br/>
  <b>Tracking Cookies Data</b><br/>
  We use cookies and similar tracking technologies to track the activity on our Service and we hold certain information.<br/>
  Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Other tracking technologies are also used such as beacons, tags and scripts to collect and track information and to improve and analyze our Service.<br/>
  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.<br/>
  Examples of Cookies we use:<br/>
  •	Session Cookies: We use Session Cookies to operate our Service.<br/>
  •	Preference Cookies: We use Preference Cookies to remember your preferences and various settings.<br/>
  •	Security Cookies: We use Security Cookies for security purposes.<br/>
  •	Advertising Cookies: Advertising Cookies are used to serve you with advertisements that may be relevant to you and your interests.<br/>
  •	Use of Data<br/>
  ETPL uses the collected data for various purposes:<br/>
  •	to provide and maintain our Service;<br/>
  •	to notify you about changes to our Service;<br/>
  •	to allow you to participate in interactive features of our Service when you choose to do so;<br/>
  •	to provide customer support;<br/>
  •	to gather analysis or valuable information so that we can improve our Service;<br/>
  •	to monitor the usage of our Service;<br/>
  •	to detect, prevent and address technical issues;<br/>
  •	to fulfill any other purpose for which you provide it;<br/>
  •	to carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection;<br/>
  •	to provide you with notices about your account and/or subscription, including expiration and renewal notices, email-instructions, etc.;<br/>
  •	to provide you with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless you have opted not to receive such information;<br/>
  •	in any other way we may describe when you provide the information;<br/>
  •	for any other purpose with your consent.<br/>
  •	Retention of Data<br/>
  We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies<br/>
  We will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period, except when this data is used to strengthen the security or to improve the functionality of our Service, or we are legally obligated to retain this data for longer time periods.</p><br/>
  
  
  
  <h2 className="cols__main-title cols__main-title--top container">Transfer of Data</h2>
  <p className='p1 container'>We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies</p><br/>
  <h2 className="cols__main-title cols__main-title--top container">Disclosure of Data</h2>
  <p className='p1 container'>We may disclose personal information that we collect, or you provide.</p><br/>
  <h2 className="cols__main-title cols__main-title--top container">Disclosure for Law Enforcement.</h2>
  <p className="p1 container">Under certain circumstances, we may be required to disclose your Personal Data if required to do so by law or in response to valid requests by public authorities.</p><br/>
  <h2 className="cols__main-title cols__main-title--top container">Business Transaction.</h2>
  <p className="p1 container">If we or our subsidiaries are involved in a merger, acquisition or asset sale, your Personal Data may be transferred.<br/>
  Other cases. We may disclose your information also:<br/>
  •	to our subsidiaries and affiliates;<br/>
  •	for the purpose of including your company’s logo on our website;<br/>
  •	Security of Data<br/>
  The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p><br/>
  <h2 className="cols__main-title cols__main-title--top container">Service Providers</h2>
  <p className="p1 container" >We may employ third party companies and individuals to facilitate our Service (“Service Providers”), provide Service on our behalf, perform Service-related services or assist us in analyzing how our Service is used.<br/>
  These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p><br/>
  <h2 className="cols__main-title cols__main-title--top container">Analytics</h2>
  <p className="p1 container">We may use third-party Service Providers to monitor and analyze the use of our Service.<br/>
  Google Analytics<br/>
  Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualise and personalise the ads of its own advertising network.<br/>
  For more information on the privacy practices of Google, please visit the Google Privacy Terms web page: <a href="https://policies.google.com/privacy?hl=en
  ">https://policies.google.com/privacy?hl=en
  </a><br/>
  We also encourage you to review the Google's policy for safeguarding your data: <a href="https://support.google.com/analytics/answer/6004245">https://support.google.com/analytics/answer/6004245</a>.</p><br/>
  <h2 className="cols__main-title cols__main-title--top container">Changes to This Privacy Policy</h2>
  <p className="p1 container">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.<br/>
  We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update “effective date” at the top of this Privacy Policy.<br/>
  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p><br/>
  <h2 className="cols__main-title cols__main-title--top container">Contact Us</h2>
  <p className='p1 container'>If you have any questions about this Privacy Policy, please contact us:<br/>
  By email: <a href="mailto:support@all-cures.com">support@all-cures.com</a>.<br/>
  By visiting this page on our website: <a href="https://www.all-cures.com">www.all-cures.com</a>.</p>`,
  };
  if (loading) {
    return <ContentLoader />;
  }
  const submitArticleForm = async e => {
    console.log('Form Submit initiatd');
    setLoading(true);
    if (article != '') {
      axios.defaults.withCredentials = true;
      axios
        .post(`${backendHost}/content?cmd=createArticle`, {
          headers: {
            'Access-Control-Allow-Credentials': true,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          title: title,
          comments: comment,
          authById: [user],
          copyId: copyright,
          disclaimerId: 1,
          articleStatus: 2,
          articleContent: encodeURIComponent(
            JSON.stringify({
              time: 1631083559825,
              blocks: [
                {id: 'ZvfhlKCqsp', type: 'paragraph', data: {text: article}},
              ],
              version: '2.21.0',
            }),
          ),
        })
        .then(res => {
          console.log(res);
          if (res.data === 1) {
            setLoading(false);
            toast.show({
              title: 'Article created successfully!',
              description: 'Check MyCures Tab.',
              status: 'success',
              placement: 'bottom',
              style: {borderRadius: 20, marginBottom: 20},
            });
          } else if (res.data === -3) {
            setLoading(false);
            toast.show({
              title: 'Title Already Taken!',
              description: 'Please change the title',
              status: 'warning',
              placement: 'bottom',
              style: {borderRadius: 20, marginBottom: 20},
            });
          } else {
            Alert.alert('some error occured');
          }
        })
        .catch(err => {
          err;
        });
    } else {
      setLoading(false);
      Alert.alert('Enter article details!');
    }
  };

  const titleValue = () => {
    return (
      <View style={styles.action}>
        <TextInput
          placeholder="Enter Title"
          placeholderTextColor={Color.appDefaultColor}
          style={styles.textInput}
          autoCapitalize="none"
          value={title}
          returnKeyType="done"
          onChangeText={e => setTitle(e)}
        />

        {data.check_textInputChange ? (
          <View animation="bounceIn">
            <Feather name="check-circle" color="green" size={20} />
          </View>
        ) : null}
      </View>
    );
  };
  const remarks = () => {
    return (
      <View style={styles.action}>
        <TextInput
          placeholder="Leave comments here"
          placeholderTextColor={Color.appDefaultColor}
          secureTextEntry={data.secureTextEntry ? true : false}
          style={styles.textInput}
          autoCapitalize="none"
          returnKeyType="go"
          value={comment}
          onChangeText={e => setComment(e)}
        />
      </View>
    );
  };

  const articles = () => {
    return (
      <View style={[styles.action, {height: height / 4}]}>
        <TextInput
          placeholder="Write cure description here"
          placeholderTextColor={Color.appDefaultColor}
          secureTextEntry={data.secureTextEntry ? true : false}
          style={styles.textInput}
          autoCapitalize="none"
          returnKeyType="go"
          value={article}
          onChangeText={e => setArticle(e)}
          multiline={true}
        />
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.feedHeader}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 36,
            marginLeft: 5,
          }}>
          <Text style={styles.read}>Submit Article</Text>
        </View>
      </View>
      <ScrollView>
        <View>
          <Text style={styles.title}>Title</Text>
          {titleValue()}
        </View>
        <View space={2}>
          <Text style={styles.title}>Remarks</Text>
          {remarks()}
        </View>
        <View space={2}>
          <Text style={styles.title}>Write cure here</Text>
          {articles()}
        </View>
        <View style={styles.privacy}>
          <Checkbox
            shadow={2}
            value="test"
            isDisabled
            accessibilityLabel="This is a dummy checkbox"
            colorScheme="purple"
            defaultIsChecked>
            <Text style={styles.privacyText}>
              I certify that i am at least 13 years old and I have read and
            </Text>
          </Checkbox>

          <Checkbox
            shadow={2}
            value="test"
            isDisabled
            accessibilityLabel="This is a dummy checkbox"
            colorScheme="purple"
            defaultIsChecked>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setTerms(true) & setShowModal(true)}>
              <Text style={styles.privacyText}>Accept Terms & Conditions</Text>
            </TouchableOpacity>
          </Checkbox>
          <Checkbox
            shadow={2}
            value="test"
            isDisabled
            accessibilityLabel="This is a dummy checkbox"
            defaultIsChecked
            colorScheme="purple"
            isReadOnly>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setPrivacy(true) & setShowModal(true)}>
              <Text style={styles.privacyText}>Privacy Policy</Text>
            </TouchableOpacity>
          </Checkbox>
        </View>

        <Pressable style={styles.btn} onPress={e => submitArticleForm(e)}>
          <Text style={styles.textBtn}>Submit</Text>
        </Pressable>
      </ScrollView>
      <Modal
        size="full"
        isOpen={showModal}
        onClose={() =>
          terms
            ? setTerms(false) & setPrivacy(false) & setShowModal(false)
            : setShowModal(false)
        }>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>
            {terms ? 'Terms and Conditions' : 'Privacy Policy'}
          </Modal.Header>
          <Modal.Body>
            <ScrollView>
              <RenderHTML
                contentWidth={'100%'}
                source={terms ? source : source1}
                tagsStyles={{
                  adjustsFontSizeToFit: true,

                  body: {color: '#00415e'},
                }}
              />
            </ScrollView>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default SubmitArticle;

const styles = StyleSheet.create({
  feedHeader: {
    height: 100,
    width: width,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  read: {
    color: Color.colorDarkslategray,
    fontWeight: '700',
    fontSize: 25,
  },

  action: {
    height: 55,
    margin: 8,
    padding: 5,
  },

  textInput: {
    flex: 1,
    padding: 5,

    fontFamily: FontFamily.poppinsRegular,
    borderWidth: 1,
    borderColor: Color.appDefaultColor,
    color: Color.colorDarkslategray,
    fontSize: 16,
    padding: 2,

    backgroundColor: Color.lightpurple,
  },

  button: {
    alignItems: 'center',
    marginTop: 50,
  },

  textBtn: {
    color: Color.colorDarkslategray,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    fontFamily: FontFamily.poppinsRegular,
  },

  btn: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Color.appDefaultColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 2.5,
    alignSelf: 'center',

    height: 40,
    backgroundColor: Color.lightpurple,

    marginVertical: 5,
  },

  privacy: {
    margin: 5,
    height: 100,
    justifyContent: 'space-between',
  },
  privacyText: {
    marginLeft: 2,
    fontSize: 12,
    color: Color.appDefaultColor,
  },
  title: {
    color: Color.appDefaultColor,
    fontFamily: FontFamily.poppinsBold,
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: '600',
    letterSpacing: 1,
  },
});
