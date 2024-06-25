import React, {useState} from "react";
import { Frame } from "../components/Frame";
import { FrameWrapper } from "../components/FrameWrapper";
import { HomePrimaryMenu } from "../components/HomePrimaryMenu";
import { Rectangle } from "../components/Rectangle";
import { TopNavigation } from "../components/TopNavigation";
import { FluentIosArrow24Filled2 } from "../icons/FluentIosArrow24Filled2";
import { FluentIosArrow24Filled5 } from "../icons/FluentIosArrow24Filled5";
import { IcRoundInfo3 } from "../icons/IcRoundInfo3";
import { MdiIdea5 } from "../icons/MdiIdea5";
import {useParams} from "react-router-dom";
import "./template.css";

export const TemplateHTML = () => {

  return (
    <div className="home-overview">
      <div className="div-6">
        <div className="frame-22">
          <div className="group-3" />
          <div className="frame-23">
            <div className="frame-24">
              <div className="text-wrapper-14">Joe Johnson</div>
              <div className="frame-25">
                <img className="ellipse-4" alt="Ellipse" src="https://c.animaapp.com/zzQb4IEW/img/ellipse-6-1@2x.png" />
                <img className="ellipse-5" alt="Ellipse" src="https://c.animaapp.com/zzQb4IEW/img/ellipse-7@2x.png" />
              </div>
            </div>
            <img className="line" alt="Line" src="https://c.animaapp.com/zzQb4IEW/img/line-1.svg" />
            <div className="frame-24">
              <div className="frame-26">
                <div className="text-wrapper-15">Company Name</div>
                <div className="text-wrapper-16">Poodle Cyber security</div>
              </div>
              <img className="line-2" alt="Line" src="https://c.animaapp.com/zzQb4IEW/img/line-2.svg" />
              <div className="frame-27">
                <div className="text-wrapper-15">Position</div>
                <div className="text-wrapper-17">Engineering Manager</div>
              </div>
            </div>
          </div>
        </div>
        <div className="frame-28">
          <div className="frame-29">
            <div className="text-wrapper-18">Get to know Joe</div>
          </div>
          <div className="frame-30">
            <div className="frame-31">
              <div className="frame-32">
                <div className="frame-33">
                  <div className="text-wrapper-19">Futuristic</div>
                </div>
                <FluentIosArrow24Filled5 className="fluent-ios-arrow-2" />
              </div>
              <img className="line-3" alt="Line" src="https://c.animaapp.com/zzQb4IEW/img/line-12-1.svg" />
              <p className="text-wrapper-20">
                Joe is inspired by future possibilities. Paint a vivid picture of the future state that she can achieve
                with your product. How will it help her lead or stay ahead in her field? How does it fit into future
                trends?
              </p>
            </div>
            <div className="frame-34">
              <div className="frame-24">
                <div className="text-wrapper-19">Developer</div>
                <FluentIosArrow24Filled2 className="fluent-ios-arrow-2" color="#7D7E8A" />
              </div>
            </div>
            <div className="frame-34">
              <div className="frame-24">
                <div className="text-wrapper-19">Focus</div>
                <FluentIosArrow24Filled2 className="fluent-ios-arrow-2" color="#7D7E8A" />
              </div>
            </div>
            <div className="frame-34">
              <div className="frame-24">
                <div className="frame-26">
                  <div className="text-wrapper-19">Command</div>
                </div>
                <FluentIosArrow24Filled2 className="fluent-ios-arrow-2" color="#7D7E8A" />
              </div>
            </div>
          </div>
        </div>
        <div className="overlap">
          <div className="frame-35">
            <div className="frame-36">
              <div className="text-wrapper-21">Profile Certainty</div>
              <IcRoundInfo3 className="ic-round-info" color="#9F9F9F" />
            </div>
            <div className="group-wrapper">
              <div className="group-4">
                <div className="overlap-group-2">
                  <div className="text-wrapper-22">85%</div>
                  <img className="ellipse-6" alt="Ellipse" src="https://c.animaapp.com/zzQb4IEW/img/ellipse-5-1.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="frame-37">
            <div className="frame-38">
              <div className="frame-39">
                <div className="frame-36">
                  <div className="text-wrapper-21">Profile Certainty</div>
                  <IcRoundInfo3 className="ic-round-info" color="#9F9F9F" />
                </div>
                <div className="group-wrapper">
                  <div className="group-4">
                    <div className="overlap-group-2">
                      <div className="text-wrapper-23">85%</div>
                      <img
                        className="ellipse-6"
                        alt="Ellipse"
                        src="https://c.animaapp.com/zzQb4IEW/img/ellipse-5-1.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="frame-39">
                <div className="frame-36">
                  <div className="text-wrapper-21">Engagement Level</div>
                  <IcRoundInfo3 className="ic-round-info" color="#9F9F9F" />
                </div>
                <div className="group-wrapper">
                  <div className="group-4">
                    <div className="overlap-group-2">
                      <div className="text-wrapper-24">82%</div>
                      <img
                        className="ellipse-6"
                        alt="Ellipse"
                        src="https://c.animaapp.com/zzQb4IEW/img/ellipse-5-2.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="frame-40">
              <div className="frame-29">
                <div className="text-wrapper-18">Top personality</div>
              </div>
            </div>
            <div className="frame-40">
              <div className="frame-29">
                <div className="text-wrapper-18">Top personality</div>
              </div>
              <div className="group-5">
                <div className="overlap-group-3">
                  <div className="text-wrapper-25">Achiever</div>
                  <Rectangle className="rectangle-26" />
                  <Rectangle className="rectangle-instance" />
                  <Rectangle className="rectangle-26-instance" />
                  <Rectangle className="design-component-instance-node" />
                  <Rectangle className="rectangle-4" />
                  <div className="text-wrapper-26">Command</div>
                  <div className="text-wrapper-27">Focus</div>
                  <div className="text-wrapper-28">Developer</div>
                  <div className="text-wrapper-29">Futuristic</div>
                  <img className="pentagon" alt="Pentagon" src="https://c.animaapp.com/zzQb4IEW/img/pentagon@2x.png" />
                  <img
                    className="mask-group"
                    alt="Mask group"
                    src="https://c.animaapp.com/zzQb4IEW/img/mask-group@2x.png"
                  />
                  <img className="vector" alt="Vector" src="https://c.animaapp.com/zzQb4IEW/img/vector-1.svg" />
                </div>
              </div>
            </div>
            <div className="frame-22-wrapper">
              <Frame className="frame-instance" />
            </div>
          </div>
        </div>
        <div className="frame-41">
          <div className="frame-29">
            <div className="text-wrapper-18">Top challenges in the role</div>
          </div>
          <div className="frame-42">
            <div className="frame-43">
              <div className="mdi-idea-wrapper">
                <MdiIdea5 className="mdi-idea" color="#00C875" />
              </div>
              <div className="text-wrapper-30">Protecting Sensitive Data</div>
            </div>
            <div className="frame-43">
              <div className="mdi-idea-wrapper">
                <MdiIdea5 className="mdi-idea" color="#00C875" />
              </div>
              <p className="text-wrapper-31">Managing Compliance and Regulatory Requirements</p>
            </div>
            <div className="frame-43">
              <div className="mdi-idea-wrapper">
                <MdiIdea5 className="mdi-idea" color="#00C875" />
              </div>
              <p className="text-wrapper-31">Building and Maintaining a Strong Security Culture</p>
            </div>
            <div className="frame-43">
              <div className="mdi-idea-wrapper">
                <MdiIdea5 className="mdi-idea" color="#00C875" />
              </div>
              <div className="text-wrapper-30">Responding to Security Incidents</div>
            </div>
            <div className="frame-43">
              <div className="mdi-idea-wrapper">
                <MdiIdea5 className="mdi-idea" color="#00C875" />
              </div>
              <p className="text-wrapper-32">Balancing Security with Business Growth</p>
            </div>
          </div>
        </div>
        <TopNavigation className="top-navigation-instance" groupClassName="top-navigation-2" property1="nav-1" />
      </div>
    </div>
  );
};
